import { it, expect, describe, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router';
import axios from 'axios';
import { PaymentSummary } from './PaymentSummary'

vi.mock('axios');

describe('PaymentSummary component', () => {
  let loadCart;
  let paymentSummary;
  let user;

  beforeEach(() => {
    loadCart = vi.fn();

    user = userEvent.setup();

    paymentSummary = {
      totalItems: 3,
      productCostCents: 4275,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 4774,
      taxCents: 477,
      totalCostCents: 5251
    };

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === '/api/products') {
        return {
          data: [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"]
            },
            {
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127
              },
              priceCents: 2095,
              keywords: ["sports", "basketballs"]
            }
          ]
        };
      }
    });
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
  });

  it('place an order', async () => {
    function Location() {
      const location = useLocation();
      return <div data-testid="url-path">{location.pathname}</div>;
    }

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        <Location />
      </MemoryRouter>
    );

    const placeOrderButton = screen.getByTestId('place-order-button');

    await user.click(placeOrderButton);

    expect(axios.post).toHaveBeenCalledWith('/api/orders');
    expect(loadCart).toHaveBeenCalled();
    expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
  });

});