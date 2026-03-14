# Errors and Pineapples

A kata on error handling based on the book "A Philosophy of Software Design" by John Ousterhout.

## Mario Called You

Mario, whose name is Mark, but he insists on calling him Mario, so Mario, hates two things: errors and pineapples.
Errors because every failed order is lost revenue, and pineapples because they are pineapples.
His automated pizza machine was coded by Bart. Bart programmed the pizza machine defensively:
it throws exceptions, rejects orders, refuses toppings, it behaves like a machine with opinions.
Every error thrown is a pizza not made, every pizza not made is money not earned, and Mario is mad.
He called you. You better fix it.

## Getting Started

### Using Docker

```shell
docker compose run --rm kata
```

### Or Local Installation

```shell
nvm install && pnpm install && pnpm test
```

## Instructions

Refactor the code using these four techniques. Then fulfill Mario's requirements.

- **Define errors out of existence** redesign the API so error conditions can't occur.
- **Mask exceptions** push recovery logic down so callers never see the failure.
- **Aggregate exceptions** reduce try-catch blocks.
- **Just crash.**

### Mario's Requirements

- Allow adding duplicate toppings.
- Strip pineapple from every pizza. The customer is king, except for pineapples!
- Fulfill an order even if a topping is out of stock. Customers won't notice.
- When the right pizza box size is out of stock, use a larger box.

Mario welcomes any suggestion that boosts revenue.