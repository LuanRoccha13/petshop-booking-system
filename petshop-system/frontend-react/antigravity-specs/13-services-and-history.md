# 13 Services and Appointment History

## Objective

Define the service catalog, service selection behavior, and the user history of requested services with status tracking.

## Scope

- Service catalog
- Service selection in the appointment flow
- Appointment/service history
- Status representation for each service

## Service catalog

The system must support at least the following services:

- banho
- tosa
- hidratação
- corte de unhas
- limpeza de ouvido
- pacote completo

## Service selection behavior

1. Services must be selectable in a clear and visually appealing way.
2. The UI may use cards, chips, segmented controls, or a similar pattern.
3. A selected service should be obvious and easy to change.
4. The system should support single-service and package-style selections if the admin enables them.

## Service history

The user should have an area showing previous requested services.

Each record should show:

- service name
- pet
- date
- time
- current status
- notes or important details

## Status model

Recommended statuses:

- agendado
- confirmado
- em atendimento
- concluído
- cancelado
- não compareceu

## History UI requirements

1. The history should be scannable and easy to filter.
2. Status should be represented with badges or chips.
3. The most recent items should be emphasized.
4. Completed services should remain visible for reference.
5. The interface should separate future appointments from service history when useful.

## Acceptance criteria

1. Services are selectable beyond just "banho".
2. The user can see previous services and their status.
3. Statuses are visually clear and consistent.
4. The catalog and history remain aligned with the product style.
