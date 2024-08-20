import "./topBox.scss"
import { topDealUsers } from "../../../../data/data.ts"
import React from "react"
const TopBox = () => {
  return (
    <div className="topBox">
      <h1 className="text-lg lg:text-3xl font-bold leading-9 dark:text-slate-200 text-slate-950">Recent Transactions</h1>
      <div className="list">
        {topDealUsers.map(user => (
          <div className="listItem" key={user.id}>
            <div className="user">
              <img src={user.img} alt="" />
              <div className="userTexts">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span className="amount">₹{Number(user.amount) * 1000}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopBox