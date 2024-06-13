import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../Context/globalContext'

function Transaction() {
    const {transactionHistory} = useGlobalContext()

    const [...history] = transactionHistory()

    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            {history.map((item) =>{
                const {_id, title, amount, type} = item
                return (
                    <div key={_id} className="history-item">
                        <p style={{
                            color: type === 'expense' ? 'red' : 'green'
                        }}>
                            {title}
                        </p>

                        <p style={{
                            color: type === 'expense' ? 'red' : 'green'
                        }}>
                            {
                                type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0: amount}`
                            }
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history-item{
        background: transparent;
        width:1000px;
        background-color:#1F2A40;
        border: 2px solid black;
        margin-left:30px;
        padding:0.5rem;
        border-radius: 5px;
        font-size:15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default Transaction