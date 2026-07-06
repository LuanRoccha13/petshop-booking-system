# 15 Scheduling and Availability

## Objective

Define how the agenda should work to prevent conflicts and let the administrator control business hours and service intervals.

## Scope

- operating hours
- appointment interval rules
- available time slot generation
- conflict prevention
- admin availability controls

## Availability model

1. The administrator defines the business hours, for example 09:00 to 19:30.
2. The administrator defines the interval between appointments, for example 30 minutes.
3. The appointment form must show only valid time slots.
4. The client must not be able to select times outside the configured rules.

## Slot generation rules

1. The system should generate slots based on start time, end time, and interval.
2. Slots must respect the current availability configuration.
3. The UI should hide unavailable slots instead of showing invalid ones.
4. The current selected slot must remain obvious during form interaction.

## Conflict prevention

1. Double booking must be prevented at the UI and business-rule levels.
2. If a slot is already taken, it should not appear as selectable.
3. If availability changes, the form should reflect the new rules immediately or on refresh.

## Admin configuration

The administrator must be able to:

- edit opening hours
- edit closing hours
- edit appointment interval
- view how the schedule is generated
- temporarily block periods for exceptions

## Form behavior

1. The appointment form should adapt to the configured schedule rules.
2. The UI should communicate why some times are unavailable.
3. The available times should be easy to scan and select.

## Acceptance criteria

1. The agenda only shows valid slots.
2. The admin can control operating hours and interval.
3. The form prevents avoidable scheduling conflicts.
4. The experience remains simple for the client and configurable for the admin.
