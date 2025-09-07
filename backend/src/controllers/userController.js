import User from "../models/user.js";
import Event from "../models/event.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId)
      .select('-password')
      .populate('savedEvents', 'title eventType startDate location')
      .populate('registeredEvents', 'title eventType startDate location');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error("Get user profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching profile"
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updateData = req.body;

    // Remove sensitive fields from update
    delete updateData.password;
    delete updateData.email;
    delete updateData.userType;
    delete updateData.isAdmin;
    delete updateData.savedEvents;
    delete updateData.registeredEvents;

    // Trim string fields
    const trimmedData = {};
    Object.keys(updateData).forEach(key => {
      if (typeof updateData[key] === 'string') {
        trimmedData[key] = updateData[key].trim();
      } else {
        trimmedData[key] = updateData[key];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      trimmedData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error("Update user profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while updating profile"
    });
  }
};

export const saveEvent = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.params;

    // Check if event exists and is approved
    const event = await Event.findOne({ _id: eventId, status: 'approved' });
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    const user = await User.findById(userId);
    
    // Check if already saved
    if (user.savedEvents.includes(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Event already saved"
      });
    }

    user.savedEvents.push(eventId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Event saved successfully"
    });

  } catch (error) {
    console.error("Save event error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while saving event"
    });
  }
};

export const unsaveEvent = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.params;

    const user = await User.findById(userId);
    
    // Remove from saved events
    user.savedEvents = user.savedEvents.filter(id => id.toString() !== eventId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Event removed from saved events"
    });

  } catch (error) {
    console.error("Unsave event error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while removing saved event"
    });
  }
};

export const registerForEvent = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.params;

    // Check if event exists and is approved
    const event = await Event.findOne({ _id: eventId, status: 'approved' });
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    // Check if event is in the future
    if (new Date(event.startDate) <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Cannot register for past events"
      });
    }

    const user = await User.findById(userId);
    
    // Check if already registered
    if (user.registeredEvents.includes(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Already registered for this event"
      });
    }

    user.registeredEvents.push(eventId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Successfully registered for event",
      event: {
        _id: event._id,
        title: event.title,
        eventType: event.eventType,
        startDate: event.startDate,
        registrationLink: event.registrationLink
      }
    });

  } catch (error) {
    console.error("Register for event error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while registering for event"
    });
  }
};

export const unregisterFromEvent = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.params;

    const user = await User.findById(userId);
    
    // Remove from registered events
    user.registeredEvents = user.registeredEvents.filter(id => id.toString() !== eventId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Successfully unregistered from event"
    });

  } catch (error) {
    console.error("Unregister from event error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while unregistering from event"
    });
  }
};

export const getSavedEvents = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const user = await User.findById(userId)
      .populate({
        path: 'savedEvents',
        options: {
          skip: skip,
          limit: parseInt(limit),
          sort: { startDate: 1 }
        },
        populate: {
          path: 'createdBy',
          select: 'firstName lastName institution'
        }
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const totalSaved = await User.findById(userId).select('savedEvents');
    const total = totalSaved.savedEvents.length;

    res.status(200).json({
      success: true,
      savedEvents: user.savedEvents,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalEvents: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error("Get saved events error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching saved events"
    });
  }
};

export const getRegisteredEvents = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const user = await User.findById(userId)
      .populate({
        path: 'registeredEvents',
        options: {
          skip: skip,
          limit: parseInt(limit),
          sort: { startDate: 1 }
        },
        populate: {
          path: 'createdBy',
          select: 'firstName lastName institution'
        }
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const totalRegistered = await User.findById(userId).select('registeredEvents');
    const total = totalRegistered.registeredEvents.length;

    res.status(200).json({
      success: true,
      registeredEvents: user.registeredEvents,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalEvents: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error("Get registered events error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching registered events"
    });
  }
};
