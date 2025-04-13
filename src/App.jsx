import { useState } from "react";
import "./App.css";
import Modal from "./Modal";

function App() {
  const [wallet, setWallet] = useState(5000);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState("");
  const [title, setTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [transactions, setTransactions] = useState([]);

  const addExpense = () => {
    if(expenseAmount > wallet) {
      alert("You do not have enough balance");
    }
    else {
      setWallet(wallet - parseInt(expenseAmount));
      setIsExpenseModalOpen(false);
      setTransactions([
        ...transactions,
        {
          title,
          amount: parseInt(expenseAmount),
          category: expenseCategory,
          date: expenseDate,
        },
      ]);
      setTitle("");
      setExpenseAmount("");
      setExpenseCategory("");
      setExpenseDate("");
    }
  }
  return (
    <>
      <div className="h-screen bg-gray-800 p-3">
        <h1 className="text-4xl text-white font-semibold text-start p-3">
          Expense Tracker
        </h1>
        <div className="grid grid-cols-3 bg-gray-700 rounded-lg p-3 gap-6">
          <div className="col-span-2 rounded-lg p-6 gap-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Wallet Card */}
              <div className="col-span-1 bg-gray-500 rounded-lg p-6 shadow gap-6 flex flex-col items-center justify-center">
                <div className="text-3xl text-white text-start font-normal">
                  Wallet Balance:{" "}
                  <span className="text-green-400">${wallet}</span>
                </div>
                <button
                  type="button" 
                  className="text-2xl text-white font-normal py-2 px-6 rounded-full bg-gradient-to-r from-green-600 to-green-400 cursor-pointer"
                  onClick={() => setIsIncomeModalOpen(true)}
                >
                  + Add Income
                </button>
              </div>

              {/* Expense Card */}
              <div className="col-span-1 bg-gray-500 rounded-lg p-6 shadow gap-6 flex flex-col items-center justify-center">
                <div className="text-3xl text-white text-start font-normal">
                  Expenses: <span className="text-yellow-500">$1000</span>
                </div>
                <button
                type="button"
                  className="text-2xl text-white font-normal py-2 px-6 rounded-full bg-gradient-to-r from-red-600 to-red-400 cursor-pointer"
                  onClick={() => setIsExpenseModalOpen(true)}
                >
                 + Add Expense
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-1 rounded-lg p-3"></div>
        </div>

        {/* Transactions */}
        <div className="grid grid-cols-3 rounded-lg p-3 gap-6">
          <div className="col-span-2">
            <div className="text-2xl text-white font-normal text-start p-3">
              Recent Transaction
            </div>
            <div className="col-span-2 bg-gray-200 rounded-lg p-6 shadow gap-6 flex flex-col items-center justify-center">
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow mb-2 w-full"
                  >
                    <div className="flex justify-between">
                      <div className="text-lg font-semibold">
                        {transaction.title}
                      </div>
                      <div className="text-lg font-semibold text-red-500">
                        -${transaction.amount}
                      </div>
                    </div>
                    <div className="text-gray-600">
                      {transaction.category} | {transaction.date}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No transactions found</div>
              )}
            </div>
          </div>
          <div className="col-span-1">
            <div className="text-2xl text-white font-normal text-start p-3">
              Top Expenses
            </div>
            <div className="col-span-2 bg-gray-200 rounded-lg p-6 shadow gap-6 flex flex-col items-center justify-center"></div>
          </div>
        </div>
      </div>

      {/* Income Modal */}
      <Modal
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
      >
        <div className="flex flex-col gap-4">
          <div className="text-2xl text-black font-semibold mb-2">
            Add Balance
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setWallet(wallet + parseInt(incomeAmount));
              setIsIncomeModalOpen(false);
              setIncomeAmount("");
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <input
                type="number"
                placeholder="Income Amount"
                className="p-2 rounded-lg text-black border"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
                required
              />
              <button
                type="submit"
                className="text-white font-normal py-2 px-6 rounded-full bg-yellow-500 cursor-pointer text-nowrap"
              >
                Add Balance
              </button>
              <button
                onClick={() => setIsIncomeModalOpen(false)}
                className="text-white font-normal py-2 px-6 rounded-full bg-gray-500 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Expense Modal */}
      <Modal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
      >
        <div className="flex flex-col gap-4">
          <div className="text-2xl text-black font-semibold mb-2">
            Add Balance
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addExpense();
            }}
          >
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="p-2 rounded-lg text-black border col-span-1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Price"
                name="price"
                className="p-2 rounded-lg text-black border col-span-1"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                required
              />
              <select name="category" id="category"
               onChange={(e) => setExpenseCategory(e.target.value)}
               required>
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
  
              <input
                type="date"
                name="date"
                placeholder="Date"
                className="p-2 rounded-lg text-black border col-span-1"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                required
              />
              <button
                type="submit"
                className="text-white font-normal py-2 px-6 rounded-full bg-yellow-500 cursor-pointer col-span-1"
              >
                Add Expense
              </button>
              <button
                onClick={() => setIsExpenseModalOpen(false)}
                className="text-white font-normal py-2 px-6 rounded-full bg-gray-500 cursor-pointer col-span-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default App;
