"use client"

import { useState, useEffect } from "react"
import { Trash2 } from "lucide-react"

export default function Data({ expenses, deleteExpense }) {
  const [totalSpend, setTotalSpend] = useState(0)

  useEffect(() => {
    const total = expenses.reduce((sum, expense) => sum + expense.spendMoney, 0)
    setTotalSpend(total)
  }, [expenses])

  const calculateAccount = (spendMoney) => {
    if (totalSpend === 0) return 0

   
    const perPersonShare = totalSpend / expenses.length
    console.log(perPersonShare,"perpershow sherwee")
    return perPersonShare - spendMoney
  }

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4 text-primary">Expense Data</h2>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="table-header">
              <th className="table-cell text-left p-1">S.No</th>
              <th className="table-cell text-left">Full Name</th>
              <th className="table-cell text-left">Date</th>
              <th className="table-cell text-left">Spend</th>
              <th className="table-cell text-left">Account</th>
              <th className="table-cell text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense, index) => (
                <tr key={expense.id} className={index % 2 === 0 ? "table-row-even" : "table-row-odd"}>
                  <td className="table-cell w-[px]">{index + 1}</td>
                  <td className="table-cell">{expense.name}</td>
                  <td className="table-cell">{new Date().toLocaleDateString()}</td>
                  <td className="table-cell">{expense.spendMoney.toFixed(2)}</td>
                  <td className="table-cell">{calculateAccount(expense.spendMoney).toFixed(2)}</td>
                  <td className="table-cell">
                    <button onClick={() => deleteExpense(expense.id)} className="btn btn-danger p-1 rounded-full text-sm">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="table-cell text-center text-muted">
                  No expenses added yet
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="table-footer font-semibold">
              <td colSpan={3} className="text-left table-cell">
                Total:
              </td>
              <td className="table-cell">{totalSpend.toFixed(2)}</td>
              <td colSpan={2} className="table-cell"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {expenses.length > 0 && (
        <div className="mt-4 summary-box p-5">
          <h3 className="font-medium mb-2">Summary</h3>
          <ul className="list-of-summary">
            <li>
          Total Expenses: <strong className="font-semibold ml-5">{totalSpend.toFixed(2)}</strong>
            </li>
            <li>
              Per Person Share: <strong className="font-semibold">{(totalSpend / expenses.length).toFixed(2)}</strong>
            </li>
          </ul>
        </div>
      )}

      <footer >
        <div className="text-center text-muted mt-4">
        <hr className="border-t-2 border-[#87CEEB]" />
          <p className="text-sm mt-4">This is a simple expense tracker application.</p>
          <p className="text-sm">Developed by <strong className="text-[blue]"> Adnan Rafiq</strong></p>
          &copy; {new Date().getFullYear()} Adnan Rafiq. All rights reserved.
        </div>
        
        <div className="text-center text-muted mt-2">
          <a href="https://adnanportfolio-lime.vercel.app/" className="text-primary" >Vist my site</a>
        </div>
      </footer>
    </div>
  )
}
