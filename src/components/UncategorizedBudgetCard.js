import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
import BudgetCard from "./BudgetCard"

export const BUDGET_REDUCE_NUMBER = 0

export default function UncategorizedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets()
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    BUDGET_REDUCE_NUMBER
  )
  if (amount === 0) return null

  return <BudgetCard amount={amount} name="Uncategorized" gray {...props} />;
}
