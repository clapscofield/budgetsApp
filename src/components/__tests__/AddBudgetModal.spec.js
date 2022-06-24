import React from 'react';
import { render } from "@testing-library/react"
import AddBudgetModal from "../AddBudgetModal"
import BudgetsProvider from '../../contexts/BudgetsContext';

jest.mock('../../contexts/BudgetsContext', () => ({
    useBudget: jest.fn()
}))

describe("Testing Add Budget Modal", () => {
    it("should render AddBudgetModal", () => {
        const rendered = render(
            <BudgetsProvider>
                <AddBudgetModal />
            </BudgetsProvider>
        )
        expect(rendered).toBeDefined();
    })
})