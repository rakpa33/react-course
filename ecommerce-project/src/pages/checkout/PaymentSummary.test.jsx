import { it, expect, describe, vi, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router';
import axios from 'axios';
import { PaymentSummary } from './PaymentSummary'

vi.mock('axios');

describe('PaymentSummary component', () => {
  let loadCart;
  let paymentSummary;

  beforeEach(() => {
    loadCart = vi.fn();

    paymentSummary = {
      totalItems: 3,
      productCostCents: 4275,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 4774,
      taxCents: 477,
      totalCostCents: 5251
    };
  });

  it('displays the correct details', async () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>
    );

    expect(screen.getByText('Items (3):')).toBeInTheDocument();

    expect(screen.getByTestId('payment-summary-item')).toHaveTextContent('$42.75');

    expect(screen.getByTestId('payment-summary-shipping')).toHaveTextContent('$4.99');

    expect(screen.getByTestId('payment-summary-before-tax')).toHaveTextContent('$47.74');

    expect(screen.getByTestId('payment-summary-tax')).toHaveTextContent('$4.77');

    expect(screen.getByTestId('payment-summary-total')).toHaveTextContent('$52.51');
  })

});