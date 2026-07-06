# 14 Roles and Permissions

## Objective

Define the responsibilities and access boundaries for client, employee, and administrator roles.

## Roles

### Client

The client is responsible for managing their pets and scheduling services.

Client responsibilities:

- manage profile
- register pets
- choose services
- choose available time slots
- view appointments and service history
- cancel their own appointments when allowed

### Employee

The employee is responsible for executing the service and updating the operational status.

Employee responsibilities:

- view the agenda for the day
- see pet details before service
- update appointment/service status
- add operational notes
- confirm completion or issue statuses such as no-show/canceled when appropriate
- consult service history for service context

### Administrator

The administrator is responsible for system configuration and global control.

Administrator responsibilities:

- manage users and employee accounts
- manage service catalog
- define operating hours
- define interval between appointments
- manage availability rules
- block dates or time ranges when needed
- monitor the full operation of the system

## Permission rules

1. The client can only manage their own data.
2. The employee can operate service status and agenda views, but not change global schedule rules.
3. The administrator can access configuration screens and full operational oversight.
4. Sensitive actions should be scoped by role and clearly communicated in the UI.

## UI implications

1. Each role should see only the navigation and actions relevant to them.
2. The product should make role boundaries visually obvious.
3. Admin and employee dashboards should feel like distinct workspaces, not the same screen with hidden buttons.

## Acceptance criteria

1. Responsibilities are clearly separated by role.
2. The UI only exposes actions appropriate to each role.
3. The system avoids duplicated or conflicting capabilities across roles.
