import Event from "../models/event.js";
import User from "../models/user.js";

export const getAllEvents = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      eventType, 
      academicCategory, 
      location, 
      mode, 
      search,
      sortBy = 'startDate',
      sortOrder = 'asc' 
    } = req.query;

    // Build query for approved events only
    const query = { 
      status: 'approved',
      startDate: { $gte: new Date() } // Only future events
    };

    // Add filters
    if (eventType && eventType !== 'all') {
      query.eventType = eventType;
    }
    
    if (academicCategory) {
      query.academicCategory = { $regex: academicCategory, $options: 'i' };
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (mode && mode !== 'all') {
      query.mode = mode;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { venueInstitution: { $regex: search, $options: 'i' } },
        { organizerName: { $regex: search, $options: 'i' } }
      ];
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

    const events = await Event.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'firstName lastName institution userType')
      .select('-__v');

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
      },
      filters: {
        eventType,
        academicCategory,
        location,
        mode,
        search
      }
    });

  } catch (error) {
    console.error("Get all events error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching events"
    });
  }
};

export const getEventByIdPublic = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findOne({
      _id: eventId,
      status: 'approved'
    }).populate('createdBy', 'firstName lastName institution userType');

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
    console.error("Get public event by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching event"
    });
  }
};

export const getEventsByType = async (req, res) => {
  try {
    const { eventType } = req.params;
    const { page = 1, limit = 12, search, location } = req.query;

    const validTypes = ["conference", "workshop", "seminar", "symposium", "webinar", "other"];
    if (!validTypes.includes(eventType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event type"
      });
    }

    const query = { 
      eventType,
      status: 'approved',
      startDate: { $gte: new Date() }
    };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { venueInstitution: { $regex: search, $options: 'i' } }
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const skip = (page - 1) * limit;

    const events = await Event.find(query)
      .sort({ startDate: 1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'firstName lastName institution userType')
      .select('-__v');

    const total = await Event.countDocuments(query);

    res.status(200).json({
      success: true,
      events,
      eventType,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalEvents: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error("Get events by type error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching events"
    });
  }
};

export const getFeaturedEvents = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    // Get upcoming events sorted by start date
    const events = await Event.find({
      status: 'approved',
      startDate: { $gte: new Date() }
    })
      .sort({ startDate: 1 })
      .limit(parseInt(limit))
      .populate('createdBy', 'firstName lastName institution userType')
      .select('-__v');

    res.status(200).json({
      success: true,
      events
    });

  } catch (error) {
    console.error("Get featured events error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching featured events"
    });
  }
};

export const getEventStats = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments({ status: 'approved' });
    const upcomingEvents = await Event.countDocuments({ 
      status: 'approved',
      startDate: { $gte: new Date() }
    });
    
    const eventsByType = await Event.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: '$eventType', count: { $sum: 1 } } }
    ]);

    const eventsByMonth = await Event.aggregate([
      { 
        $match: { 
          status: 'approved',
          startDate: { $gte: new Date() }
        } 
      },
      {
        $group: {
          _id: {
            year: { $year: '$startDate' },
            month: { $month: '$startDate' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 12 }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalEvents,
        upcomingEvents,
        eventsByType,
        eventsByMonth
      }
    });

  } catch (error) {
    console.error("Get event stats error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching stats"
    });
  }
};
