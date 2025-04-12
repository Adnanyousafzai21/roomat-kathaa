"use client"

import { useState, useEffect } from "react"
import EnterData from "./enterdata"
import Data from "./data"

export default function Home() {
  const [roommates, setRoommates] = useState([])
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    // Load roommates from localStorage
    const storedRoommates = localStorage.getItem("roommates")
    if (storedRoommates) {
      setRoommates(JSON.parse(storedRoommates))
    } else {
      // Initial roommates if none exist
      const initialRoommates = [
        { id: "1", name: "Arif Ullah", spendMoney: 0 },
        { id: "2", name: "Atif Ullah", spendMoney: 0 },
        { id: "3", name: "Ibrar Ahmed", spendMoney: 0 },
        { id: "4", name: "Naqib", spendMoney: 0 },
      ]
      setRoommates(initialRoommates)
      localStorage.setItem("roommates", JSON.stringify(initialRoommates))
    }

    // Load expenses from localStorage
    const storedExpenses = localStorage.getItem("expenses")
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses))
    }
  }, [])

  const addRoommate = (name) => {
    const newRoommate = {
      id: Date.now().toString(),
      name,
      spendMoney: 0,
    }
    const updatedRoommates = [...roommates, newRoommate]
    setRoommates(updatedRoommates)
    localStorage.setItem("roommates", JSON.stringify(updatedRoommates))
  }

  const addExpense = (id, amount) => {
    // Find the roommate
    const roommate = roommates.find((r) => r.id === id)
    if (!roommate) return

    // Check if roommate already has an expense entry
    const existingExpenseIndex = expenses.findIndex((e) => e.id === id)
    let updatedExpenses

    if (existingExpenseIndex >= 0) {
      // Update existing expense
      updatedExpenses = [...expenses]
      updatedExpenses[existingExpenseIndex] = {
        ...updatedExpenses[existingExpenseIndex],
        spendMoney: amount,
      }
    } else {
      // Add new expense
      updatedExpenses = [...expenses, { ...roommate, spendMoney: amount }]
    }

    setExpenses(updatedExpenses)
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses))
  }

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id)
    setExpenses(updatedExpenses)
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses))
  }

  return (
    <div className="flex flex-col gap-8">
      <EnterData roommates={roommates} addRoommate={addRoommate} addExpense={addExpense} />
      <Data expenses={expenses} deleteExpense={deleteExpense} />
    </div>
  )
}
