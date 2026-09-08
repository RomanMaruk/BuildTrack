### Full schema

```md
                         ┌──────────────┐
                         │     USER     │
                         └──────┬───────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
             ProjectMember                (owner)
                    │                       │
                    ▼                       ▼
             ┌──────────────┐        ┌──────────────┐
             │   PROJECT    │        │   CATEGORY   │
             └──────┬───────┘        └──────┬───────┘
                    │                       │
          ┌─────────┴─────────┐             ▼
          │                   │          CATEGORY
          ▼                   ▼            (child)
     EXPENSE              SUPPLIER
          │
          │
          ├──────────────► USER
          │
          ├──────────────► CATEGORY
          │
          ├──────────────► SUPPLIER
          │
          └──────────────► ATTACHMENT


                    ┌──────────────────┐
                    │  EXCHANGE RATE   │   (кеш курсів НБУ,
                    └──────────────────┘    Expense.rate бере звідси
                                             значення за замовчуванням)
```

## ROLES

| Permission        | OWNER | ADMIN | EDITOR | ACCOUNTANT | VIEWER |
| ----------------- | ----: | ----: | -----: | ---------: | -----: |
| View project      |    ✅ |    ✅ |     ✅ |         ✅ |     ✅ |
| Add expense       |    ✅ |    ✅ |     ✅ |         ✅ |     ❌ |
| Edit expense      |    ✅ |    ✅ |     ✅ |         ✅ |     ❌ |
| Delete expense    |    ✅ |    ✅ |     ❌ |         ❌ |     ❌ |
| Manage categories |    ✅ |    ✅ |     ❌ |         ❌ |     ❌ |
| Manage members    |    ✅ |    ✅ |     ❌ |         ❌ |     ❌ |
| Delete project    |    ✅ |    ❌ |     ❌ |         ❌ |     ❌ |

## ENUMS

Enums
├── UserRole
├── ProjectRole
├── CurrencyCode
└── ExpenseUnit
