import {Secret_key, STRIPE_PUBLISHABLE_KEY} from './keys';
export async function getCreditCardToken(creditCardData) {
  console.log(creditCardData);
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc,
  };
  try {
    const response = await fetch('https://api.stripe.com/v1/tokens', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
      },
      method: 'post',
      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&'),
    });
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}

export const charges = async (CURRENCY, CARD_TOKEN, amount) => {
  console.log(amount);
  const card = {
    amount: amount,
    currency: CURRENCY,
    source: CARD_TOKEN,
    description: 'test description',
  };

  return fetch('https://api.stripe.com/v1/charges', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${Secret_key}`,
    },
    method: 'post',
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&'),
  }).then(response => response.json());
};
