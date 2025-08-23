# Professional Pilot Portfolio - Content Update Procedures

This document provides comprehensive instructions for updating content in the professional pilot portfolio website. The data management system allows for easy updates without modifying HTML or CSS files directly.

## Table of Contents

1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Quick Start Guide](#quick-start-guide)
4. [Detailed Update Procedures](#detailed-update-procedures)
5. [Data Validation](#data-validation)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

## Overview

The pilot portfolio uses a centralized data management system with three main components:

- **data-config.js**: Contains all configuration objects with pilot information
- **data-utils.js**: Provides utility functions for data manipulation and validation
- **data-manager.js**: Main interface for managing data updates with logging and validation

## File Structure

```
├── data-config.js          # Configuration objects (edit for basic updates)
├── data-utils.js           # Utility functions (don't edit unless extending functionality)
├── data-manager.js         # Main data manager (don't edit unless extending functionality)
├── script.js               # Main website JavaScript (loads data files)
└── CONTENT_UPDATE_PROCEDURES.md  # This documentation file
```

## Quick Start Guide

### Method 1: Direct Configuration Updates (Recommended for Simple Changes)

1. Open `data-config.js` in a text editor
2. Locate the relevant configuration object
3. Update the values directly
4. Save the file and refresh the website

### Method 2: Using the Data Manager (Recommended for Complex Updates)

1. Open browser developer console (F12)
2. Use the global `pilotDataManager` object
3. Call appropriate methods to update data
4. Changes are automatically validated and logged

## Detailed Update Procedures

### 1. Updating Flight Hours

#### Method A: Direct Configuration Update
```javascript
// In data-config.js, find flightExperience object
const flightExperience = {
    totalHours: 9000, // Update this number
    // ... rest of configuration
};
```

#### Method B: Using Data Manager
```javascript
// In browser console
pilotDataManager.updateFlightHours(9000);

// Add hours to specific aircraft
pilotDataManager.addFlightHours('B737', 100);

// Add new aircraft type
pilotDataManager.addNewAircraft('B777', 500, 'Commercial');
```

### 2. Updating Certifications

#### Adding New Certification
```javascript
// In browser console
pilotDataManager.addNewCertification('typeRatings', {
    aircraft: 'BOEING 777',
    code: 'B777',
    issueDate: '2024-06-15',
    expirationDate: '2029-06-15'
});
```

#### Updating Expiration Dates
```javascript
// In browser console
pilotDataManager.updateCertExpiration('BOEING 737', '2025-12-31');
```

#### Updating Medical Certificate
```javascript
// In browser console
pilotDataManager.updateMedical('FIRST CLASS', '2024-06-01', '2025-06-01', 'NONE');
```

### 3. Adding Career Positions

#### Method A: Direct Configuration Update
```javascript
// In data-config.js, add to careerHistory array (at the beginning for most recent)
{
    flightNumber: "UA001",
    airline: "UNITED AIRLINES",
    airlineCode: "UA",
    position: "CAPTAIN",
    positionSubtitle: "WIDE BODY CAPTAIN",
    startDate: "2024-01-01",
    endDate: null, // null means current position
    aircraft: "B777",
    status: "ACTIVE",
    achievements: [
        "International route captain",
        "Training captain designation"
    ]
}
```

#### Method B: Using Data Manager
```javascript
// In browser console
pilotDataManager.addNewPosition({
    airline: "UNITED AIRLINES",
    airlineCode: "UA",
    position: "CAPTAIN",
    positionSubtitle: "WIDE BODY CAPTAIN",
    startDate: "2024-01-01",
    aircraft: "B777",
    status: "ACTIVE",
    achievements: ["International route captain"]
});
```

### 4. Adding Achievement Highlights

```javascript
// In browser console
pilotDataManager.addHighlight(
    "2024",
    "BOEING 777 TYPE RATING",
    "Successfully completed Boeing 777 type rating, qualifying for wide-body international operations.",
    ["WIDE BODY CERTIFIED", "INTERNATIONAL OPERATIONS", "LONG HAUL QUALIFIED"]
);
```

### 5. Updating Contact Information

#### Method A: Direct Configuration Update
```javascript
// In data-config.js, find contactInfo array and update relevant entry
{
    type: "EMAIL",
    method: "new.email@aviation.com", // Update this
    status: "ACTIVE"
}
```

#### Method B: Using Data Manager
```javascript
// In browser console
pilotDataManager.updateContact("EMAIL", "new.email@aviation.com", "ACTIVE");
```

### 6. Updating Personal Information

#### Direct Configuration Update
```javascript
// In data-config.js, find pilotProfile object
const pilotProfile = {
    personal: {
        name: "CAPTAIN JANE DOE", // Update name
        title: "AIRLINE TRANSPORT PILOT | BOEING 777/A320 TYPE RATED", // Update title
        location: "CHICAGO, IL", // Update location
        homeBase: "ORD", // Update home base
        // ... rest of configuration
    }
};
```

## Data Validation

### Automatic Validation

The data manager automatically validates:
- Date formats (must be YYYY-MM-DD)
- Required fields for each data type
- Numeric values for flight hours
- Certification expiration tracking

### Manual Validation

```javascript
// Check data validity
const validation = pilotDataManager.validateData();
console.log(validation);

// Get expiration alerts
const alerts = pilotDataManager.getExpirationAlerts(30); // 30 days ahead
console.log('Expiring certifications:', alerts);

// Get comprehensive expiration report
const report = pilotDataManager.getExpirationReport();
console.log('Expiration report:', report);
```

## Troubleshooting

### Common Issues

1. **Date Format Errors**
   - Always use YYYY-MM-DD format
   - Example: "2024-12-31" not "12/31/2024"

2. **Missing Required Fields**
   - Check console for specific error messages
   - Ensure all required fields are provided

3. **Data Not Updating on Website**
   - Clear browser cache and refresh
   - Check browser console for JavaScript errors
   - Verify data-config.js syntax is correct

### Debugging Commands

```javascript
// Check system status
pilotDataManager.getStatus();

// View recent changes
pilotDataManager.getChangeLog(10);

// Get data summary
pilotDataManager.getDataSummary();

// Export all data for backup
const backup = pilotDataManager.exportData();
console.log(backup);
```

## Best Practices

### 1. Data Backup
- Always backup `data-config.js` before making changes
- Use the export function to create data snapshots
- Keep change logs for audit purposes

### 2. Date Management
- Use consistent date formats (YYYY-MM-DD)
- Set calendar reminders for certification renewals
- Check expiration alerts regularly

### 3. Validation
- Run validation after major updates
- Monitor browser console for errors
- Test changes in a development environment first

### 4. Version Control
- Use Git or similar version control for tracking changes
- Commit changes with descriptive messages
- Tag releases for easy rollback

### 5. Regular Maintenance

#### Monthly Tasks
```javascript
// Check for expiring certifications
const alerts = pilotDataManager.getExpirationAlerts(60);
if (alerts.length > 0) {
    console.log('Certifications expiring in 60 days:', alerts);
}

// Validate all data
const validation = pilotDataManager.validateData();
if (!validation.isValid) {
    console.log('Data validation issues:', validation.errors);
}
```

#### Quarterly Tasks
- Review and update flight hours
- Add new achievements and career milestones
- Update contact information if changed
- Backup all data

#### Annual Tasks
- Review all certification expiration dates
- Update medical certificate information
- Add annual achievement highlights
- Comprehensive data validation and cleanup

## Example Update Scenarios

### Scenario 1: New Type Rating
```javascript
// 1. Add the type rating certification
pilotDataManager.addNewCertification('typeRatings', {
    aircraft: 'AIRBUS A350',
    code: 'A350',
    issueDate: '2024-03-15',
    expirationDate: '2029-03-15'
});

// 2. Add aircraft to experience
pilotDataManager.addNewAircraft('A350', 0, 'Commercial');

// 3. Add achievement highlight
pilotDataManager.addHighlight(
    '2024',
    'AIRBUS A350 TYPE RATING',
    'Completed Airbus A350 type rating training, expanding capabilities to next-generation wide-body aircraft.',
    ['NEXT-GEN AIRCRAFT', 'WIDE BODY', 'FUEL EFFICIENT']
);

// 4. Update credentials if needed
// Edit data-config.js pilotProfile.credentials array
```

### Scenario 2: Job Change
```javascript
// 1. End current position
pilotDataManager.endPosition('SW001', '2024-02-29');

// 2. Add new position
pilotDataManager.addNewPosition({
    airline: 'DELTA AIR LINES',
    airlineCode: 'DL',
    position: 'CAPTAIN',
    positionSubtitle: 'INTERNATIONAL CAPTAIN',
    startDate: '2024-03-01',
    aircraft: 'A350',
    status: 'ACTIVE',
    achievements: []
});
```

### Scenario 3: Medical Renewal
```javascript
// Update medical certificate
pilotDataManager.updateMedical('FIRST CLASS', '2024-08-15', '2025-08-15', 'NONE');
```

## Support and Maintenance

For technical issues or questions about the data management system:

1. Check browser console for error messages
2. Verify data format and required fields
3. Run validation functions to identify issues
4. Refer to this documentation for proper procedures

Remember to always test changes in a development environment before updating the live website.