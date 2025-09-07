import Event from "../models/event.js";

const validateEventData = (data) => {
  const errors = [];

  const requiredFields = [
    'title', 'eventType', 'academicCategory', 'description',
    'startDate', 'endDate', 'venueInstitution', 'location',
    'organizerName', 'affiliation', 'contactEmail'
  ];

  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      errors.push(`${field} is required`);
    }
  }

  if (data.startDate && data.endDate) {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      errors.push('Invalid date format');
    } else if (startDate >= endDate) {
      errors.push('End date must be after start date');
    }
  }

  // Submission deadline validation (if provided)
  if (data.submissionDeadline) {
    const submissionDeadline = new Date(data.submissionDeadline);
    const startDate = new Date(data.startDate);

    if (isNaN(submissionDeadline.getTime())) {
      errors.push('Invalid submission deadline format');
    } else if (submissionDeadline >= startDate) {
      errors.push('Submission deadline must be before event start date');
    }
  }

  // Email validation
  if (data.contactEmail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.contactEmail)) {
      errors.push('Invalid email format');
    }
  }

  // URL validation
  if (data.websiteURL && data.websiteURL.trim() !== '') {
    try {
      new URL(data.websiteURL);
    } catch {
      errors.push('Invalid website URL format');
    }
  }

  if (data.registrationLink && data.registrationLink.trim() !== '') {
    try {
      new URL(data.registrationLink);
    } catch {
      errors.push('Invalid registration link format');
    }
  }

  // Enum validations
  const validEventTypes = ["conference", "workshop", "seminar", "symposium", "webinar", "other"];
  if (data.eventType && !validEventTypes.includes(data.eventType)) {
    errors.push('Invalid event type');
  }

  const validModes = ["online", "offline", "hybrid"];
  if (data.mode && !validModes.includes(data.mode)) {
    errors.push('Invalid participation mode');
  }

  // Expected attendees validation
  if (data.expectedAttendees && (isNaN(data.expectedAttendees) || data.expectedAttendees < 0)) {
    errors.push('Expected attendees must be a positive number');
  }

  return errors;
};

export const submitEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const userId = req.user._id;

    // Validate input data
    const validationErrors = validateEventData(eventData);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors
      });
    }

    // Create event object
    const event = new Event({
      ...eventData,
      createdBy: userId,
      status: "pending", // Default status
      isVerified: false, // Default verification status
      // Trim string fields
      title: eventData.title.trim(),
      description: eventData.description.trim(),
      venueInstitution: eventData.venueInstitution.trim(),
      location: eventData.location.trim(),
      organizerName: eventData.organizerName.trim(),
      affiliation: eventData.affiliation.trim(),
      contactEmail: eventData.contactEmail.toLowerCase().trim(),
      websiteURL: eventData.websiteURL ? eventData.websiteURL.trim() : undefined,
      registrationLink: eventData.registrationLink ? eventData.registrationLink.trim() : undefined,
    });

    // Save to database
    const savedEvent = await event.save();

    // Populate creator information
    await savedEvent.populate('createdBy', 'firstName lastName email institution userType');

    res.status(201).json({
      success: true,
      message: "Event submitted successfully and is pending review",
      event: {
        _id: savedEvent._id,
        title: savedEvent.title,
        eventType: savedEvent.eventType,
        academicCategory: savedEvent.academicCategory,
        description: savedEvent.description,
        startDate: savedEvent.startDate,
        endDate: savedEvent.endDate,
        submissionDeadline: savedEvent.submissionDeadline,
        venueInstitution: savedEvent.venueInstitution,
        location: savedEvent.location,
        mode: savedEvent.mode,
        expectedAttendees: savedEvent.expectedAttendees,
        registrationFee: savedEvent.registrationFee,
        websiteURL: savedEvent.websiteURL,
        registrationLink: savedEvent.registrationLink,
        organizerName: savedEvent.organizerName,
        affiliation: savedEvent.affiliation,
        contactEmail: savedEvent.contactEmail,
        status: savedEvent.status,
        createdBy: savedEvent.createdBy,
        createdAt: savedEvent.createdAt,
      }
    });

  } catch (error) {
    console.error("Event submission error:", error);

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An event with similar details already exists"
      });
    }

    // Handle validation errors from mongoose
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error during event submission"
    });
  }
};

export const getUserEvents = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status, page = 1, limit = 10 } = req.query;

    const query = { createdBy: userId };
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const events = await Event.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'firstName lastName email institution userType');

    const total = await Event.countDocuments(query);

    res.status(200).json({
      success: true,
      events,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalEvents: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error("Get user events error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching events"
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await Event.findOne({
      _id: eventId,
      createdBy: userId
    }).populate('createdBy', 'firstName lastName email institution userType');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.status(200).json({
      success: true,
      event
    });

  } catch (error) {
    console.error("Get event by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching event"
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;
    const updateData = req.body;

    // Only allow updates for pending events
    const existingEvent = await Event.findOne({
      _id: eventId,
      createdBy: userId,
      status: 'pending'
    });

    if (!existingEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found or cannot be updated"
      });
    }

    // Validate update data
    const validationErrors = validateEventData({ ...existingEvent.toObject(), ...updateData });
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors
      });
    }

    // Update event
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        ...updateData,
        // Trim string fields
        ...(updateData.title && { title: updateData.title.trim() }),
        ...(updateData.description && { description: updateData.description.trim() }),
        ...(updateData.venueInstitution && { venueInstitution: updateData.venueInstitution.trim() }),
        ...(updateData.location && { location: updateData.location.trim() }),
        ...(updateData.organizerName && { organizerName: updateData.organizerName.trim() }),
        ...(updateData.affiliation && { affiliation: updateData.affiliation.trim() }),
        ...(updateData.contactEmail && { contactEmail: updateData.contactEmail.toLowerCase().trim() }),
        ...(updateData.websiteURL && { websiteURL: updateData.websiteURL.trim() }),
        ...(updateData.registrationLink && { registrationLink: updateData.registrationLink.trim() }),
      },
      { new: true, runValidators: true }
    ).populate('createdBy', 'firstName lastName email institution userType');

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent
    });

  } catch (error) {
    console.error("Update event error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while updating event"
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    // Only allow deletion of pending events
    const event = await Event.findOneAndDelete({
      _id: eventId,
      createdBy: userId,
      status: 'pending'
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found or cannot be deleted"
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully"
    });

  } catch (error) {
    console.error("Delete event error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while deleting event"
    });
  }
};
