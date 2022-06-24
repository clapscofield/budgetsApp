import { render, waitFor } from '@testing-library/react';
import React from 'react';
import useBudgets, { BudgetsContext, BudgetsProvider } from '../BudgetsContext';

jest.mock("uuid", () => ({
    v4: jest.fn()
}))

describe("BudgetsContext", () => {
    it("should create Budget Context", () => {
        const TestBudgetContext = () => {
           const { 
                budgets, 
                expenses, 
                getBudgetExpenses, 
                addExpense, 
                addBudget, 
                deleteBudget, 
                deleteExpense 
            } = useBudgets(); 
            expect(budgets).toBeDefined()
            expect(expenses).toBeDefined()
            expect(getBudgetExpenses).toBeDefined()
            expect(addExpense).toBeDefined()
            expect(addBudget).toBeDefined()
            expect(deleteBudget).toBeDefined()
            expect(deleteExpense).toBeDefined()
        }
        
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

    it("should delete a budget", () => {
        const TestDeleteBudget = () => { 
            const { 
                budgets, 
                addBudget, 
                deleteBudget
            } = useBudgets(); 

            addBudget('test', 100);
            budgets.map((budget) => {
                deleteBudget(budget.id)
            })
        
            return <div>{budgets}</div>;
        }
        const screen = render(<BudgetsProvider><TestDeleteBudget /></BudgetsProvider>)
        expect(screen.queryByText('test')).not.toBeDefined();
        expect(screen.queryByText('100')).not.toBeDefined();
    })

    it("should add expense", () => {
        const TestAddExpense = () => { 
            const { 
                expenses, 
                addExpense, 
                addBudget, 
                budgets
            } = useBudgets(); 

            addBudget('test', 100)

            addExpense('testDescription', 10, expenses)

            const expensesRender = expenses.map(expense => { return (
                <div id={expense.id}><span>{expense.description} - {expense.amound}</span></div>
            )})
            return <div>{expensesRender}</div>;
            
        }
        const screen = render(<BudgetsProvider><TestAddExpense /></BudgetsProvider>)
        expect(screen.queryByText('testDescription')).toBeDefined();
        expect(screen.queryByText('10')).toBeDefined();
    })
})