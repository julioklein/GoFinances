import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface GroupedByType {
  income: number[];
  outcome: number[];
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const grouped: GroupedByType = { income: [0], outcome: [0] };

    const groupedByType = this.transactions.reduce((accum, curr) => {
      accum[curr.type].push(curr.value);
      return accum;
    }, grouped);

    const income: number = groupedByType.income.reduce(
      (acc, curr) => acc + curr,
    );
    const outcome: number = groupedByType.outcome.reduce(
      (acc, curr) => acc + curr,
    );

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
