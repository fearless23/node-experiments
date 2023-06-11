const trunc = (i, d) => {
	const t = Math.pow(10, d);
	return Math.trunc(i * t) / t;
};

const truncRound = (i, d) => {
	const e = trunc(i, d); // e is smaller or equal
	if (i === e) return i;
	const t = Math.pow(10, d);
	return trunc(i, d) + 1 / t;
};

const EXCHANGE = (params) => {
	const PRECISION_ENTITY = params.entityPrecision;
	const PRECISION_CURRENCY = params.currencyPrecision;
	const PRICE = params.price;
	const MIN_AMOUNT = 1 / Math.pow(10, PRECISION_ENTITY);

	const invest = (investment) => {
		const amount = trunc(investment / PRICE, PRECISION_ENTITY);
		const ACTUAL_INVESTMENT = amount * PRICE;
		const payment = truncRound(ACTUAL_INVESTMENT, PRECISION_CURRENCY);
		const gains = payment - ACTUAL_INVESTMENT;
		const numOfTxnsForOneUnitCurrecyGain = Math.ceil(1 / gains);
		return { investment, amount, payment, gains, numOfTxnsForOneUnitCurrecyGain };
	};

	const buy = (amount) => {
		const ACTUAL_INVESTMENT = amount * PRICE;
		const payment = truncRound(ACTUAL_INVESTMENT, PRECISION_CURRENCY);
		const gains = payment - ACTUAL_INVESTMENT;
		const numOfTxnsForOneUnitCurrecyGain = Math.ceil(1 / gains);
		return { amount, payment, gains, numOfTxnsForOneUnitCurrecyGain };
	};

	const getMinInvestment = () => {
		const investment = MIN_AMOUNT * PRICE;
		return truncRound(investment, PRECISION_CURRENCY);
	};

	const getLimits = () => {
		return {
			minAmount: MIN_AMOUNT,
			minInvestment: getMinInvestment(),
		};
	};

	return { invest, buy, getLimits };
};

const params = { entityPrecision: 0, currencyPrecision: 0, price: 60 };
const milkExchange = EXCHANGE(params);
console.log(milkExchange.getLimits());
console.log(milkExchange.buy(2));
console.log(milkExchange.invest(100));

const btcExchange = EXCHANGE({ entityPrecision: 8, currencyPrecision: 2, price: 3245797 });
console.log("btcExchange");
console.log(btcExchange.getLimits());
console.log(btcExchange.buy(0.00030809));
console.log(btcExchange.invest(1000));

const usdExchange = EXCHANGE({ entityPrecision: 2, currencyPrecision: 2, price: 82.83 });
console.log("usdExchange");
console.log(usdExchange.getLimits());
console.log(usdExchange.buy(60));
console.log(usdExchange.invest(5000));
