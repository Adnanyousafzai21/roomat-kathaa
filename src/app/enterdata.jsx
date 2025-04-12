"use client"

import { useState } from "react"

export default function EnterData({ roommates, addRoommate, addExpense }) {
  const [selectedRoommateId, setSelectedRoommateId] = useState("")
  const [spendAmount, setSpendAmount] = useState("")
  const [newRoommateName, setNewRoommateName] = useState("")
  const [showAddRoommate, setShowAddRoommate] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedRoommateId && spendAmount) {
      addExpense(selectedRoommateId, Number.parseFloat(spendAmount))
      setSpendAmount("")
    }
  }

  const handleAddRoommate = (e) => {
    e.preventDefault()
    if (newRoommateName.trim()) {
      addRoommate(newRoommateName.trim())
      setNewRoommateName("")
      setShowAddRoommate(false)
    }
  }

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4 text-primary">Enter Expense Data</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
      <div className={`${showAddRoommate &&"summary-box-container"} `}>
      <button type="button" onClick={() => setShowAddRoommate(!showAddRoommate)} className="btn w-full btn-secondary mb-2">
              {showAddRoommate ? "Close" : "Add New Roomate"}
            </button>
      {showAddRoommate && (
     
          <div className="summary-box mb-2">
            <h3 className="text-md font-medium mb-2 text-center pointer">Add New Roommate</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={newRoommateName}
                onChange={(e) => setNewRoommateName(e.target.value)}
                placeholder="Enter roommate name"
                className="form-input flex-1"
              />
              <button type="button" onClick={handleAddRoommate} className="btn btn-primary">
                Add
              </button>
            </div>
          </div>
        )}
            </div>
        <div>
          <label htmlFor="roommate" className="form-label">
            Select Roommate
          </label>
          <div className="flex gap-2">
            <select
              id="roommate"
              value={selectedRoommateId}
              onChange={(e) => setSelectedRoommateId(e.target.value)}
              className="form-select"
              required
            >
              <option value="" className="text-option">Select a Roommate</option>
              {roommates.map((roommate) => (
                <option key={roommate.id} value={roommate.id} className="text-option">
                  {roommate.name}
                </option>
              ))}
            </select>
           
          </div>
        </div>

        
        <div>
          <label htmlFor="amount" className="form-label">
            Spend Amount
          </label>
          <input
            id="amount"
            type="number"
            value={spendAmount}
            onChange={(e) => setSpendAmount(e.target.value)}
            placeholder="Enter amount"
            className="form-input"
            required
            min="0"
            step="0.01"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Add Expense
        </button>
      </form>
    </div>
  )
}
