import React from 'react';
import { render } from "@testing-library/react"
import AddBudgetModal from "../AddBudgetModal"
import BudgetsContext from '../../contexts/BudgetsContext';

describe("Testing Add Budget Modal", () => {
    it("should render AddBudgetModal", () => {
        const rendered = render(<AddBudgetModal />)
        expect(rendered).toBeDefined();
    })
})