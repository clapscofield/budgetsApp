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
    it("budget add a budget", () => {
        const TestAddBudget = () => { 
            const { 
                budgets, 
                addBudget, 
            } = useBudgets(); 

            addBudget('test', 100);

            const budgetsRender = budgets.map(budget => { return <span>{budget}</span>} )
            return budgetsRender;
        }
        const screen = render(<BudgetsProvider><TestAddBudget /></BudgetsProvider>)
        expect(screen.queryByText('test')).toBeDefined();
    })

    it("should add expense", () => {
        const TestAddBudget = () => { 
            const { 
                budgets, 
                addBudget, 
            } = useBudgets(); 
            addBudget('test', 100)
            expect(budgets[0].name).toBe('test');
            expect(budgets[0].max).toBe(100);
        }
    })
})