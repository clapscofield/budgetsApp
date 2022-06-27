import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { useBudgets, BudgetsProvider } from './BudgetsContext';

jest.mock("uuid", () => ({
    v4: jest.fn()
}))

describe("BudgetsContext", () => {
    it("should create Budget Context", () => {
        const TestBudgetContext = () => {
           const context = useBudgets(); 
            return (
                <div>Test</div>
            )
        }
        const screen = render(<BudgetsProvider><TestBudgetContext /></BudgetsProvider>)
        expect(screen).toBeDefined()
        
    });
    it("should add a budget", () => {
        const TestAddBudget = () => { 
            const { 
                budgets, 
                addBudget, 
            } = useBudgets(); 

            addBudget('test', 100);

            const budgetsRender = budgets.map(budget => { return (
                <div id={budget.id}><span>{budget.name} - {budget.max}</span></div>
            )})
            return <div>{budgetsRender}</div>;
        }
        const screen = render(<BudgetsProvider><TestAddBudget /></BudgetsProvider>)
        expect(screen.queryByText('test')).toBeDefined();
        expect(screen.queryByText('100')).toBeDefined();
    })

    // it("should delete a budget", () => {
    //     const TestDeleteBudget = () => { 
    //         const { 
    //             budgets, 
    //             addBudget, 
    //             deleteBudget
    //         } = useBudgets(); 

    //         addBudget('test', 100);
    //         console.log(budgets)
    //         const budgetId = budgets && budgets[0] && budgets[0].id
    //         useEffect(() => {
    //             deleteBudget(budgetId);
    //           }, [budgetId])
        
    //         return <div>{budgets}</div>;
    //     }
    //     const screen = render(<BudgetsProvider><TestDeleteBudget /></BudgetsProvider>)
    //     expect(screen.queryByText('test')).not.toBeDefined();
    //     expect(screen.queryByText('100')).not.toBeDefined();
    // })

    // it("should add expense", () => {
    //     const TestAddExpense = () => { 
    //         const { 
    //             expenses, 
    //             addExpense, 
    //             addBudget, 
    //             budgets
    //         } = useBudgets(); 

    //         addBudget('test', 100)

    //         const budgetId = budgets.map((budget) => {
    //             return budget.id
    //         })

    //         addExpense('testDescription', 10, budgetId)

    //         const expensesRender = expenses.map(expense => { return (
    //             <div id={expense.id}><span>{expense.description} - {expense.amound}</span></div>
    //         )})
    //         return <div>{expensesRender}</div>;
            
    //     }
    //     const screen = render(<BudgetsProvider><TestAddExpense /></BudgetsProvider>)
    //     expect(screen.queryByText('testDescription')).toBeDefined();
    //     expect(screen.queryByText('10')).toBeDefined();
    // })

    it("should delete expense", () => {

    })


})