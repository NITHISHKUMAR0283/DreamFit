import "../styles/Dashboard.css"
import React,{useState} from "react"
import axios from "axios"

const API_BASE_URL = "http://localhost:5000/api/v1/products";

const Dashboard = () => {
    const [menuOpen,setMenuOpen] = useState(false)
    const [products, setProducts] = useState([])
    const [loading , setLoading] = useState(false)
    const [error , setError ] = useState(null);
    const [keyword, setKeyword] = useState("")

    return (
        <div className="dashboard-wrapper">
            <div className="header">
                <div className="left">
                    <div className="logo">logo</div>
                    <div className="Brand"> DreamFit</div>
                </div>
                <div className="Searchbar">
                    <div className="right-search">search</div>
                    
                    <div className="left-search">⌕</div>
                </div>
                <div className="right-wrapper">
                    <div className="hamburger" onClick={()=>setMenuOpen(!menuOpen)}>☰</div>
                </div>
                <div className={`right${menuOpen?"-open":""}`}>
                    <div className="filter">filter</div>
                    <div className="cart">cart</div>
                    <div className="order">order</div>
                    <div className="profile "> profile</div>

                </div>
            </div>
            <hr className="line"/>
        </div>
    )
}
export default Dashboard