"use client"

import { useState } from "react"
import "../styles/Navbar.css"
import { useClerk, useUser } from "@clerk/clerk-react"
import { Link } from "react-router-dom"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen)
  }

  const { openSignIn, signOut } = useClerk()
  const { user, isSignedIn } = useUser()

  const handleSignOut = () => {
    signOut()
    setIsUserDropdownOpen(false)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand fw-bold fs-3 text-info" href="/">
          SKY <i className="fa-solid fa-hotel"></i> 365
        </a>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link fw-medium px-3 py-2 text-dark hover-effect" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium px-3 py-2 text-dark hover-effect" href="all-rooms">
                Hotels
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium px-3 py-2 text-dark hover-effect" href="/about">
                About
              </a>
            </li>
          </ul>

          {/* Login & Search Buttons / User Dropdown */}
          <div className="d-flex align-items-center gap-3">

            {!isSignedIn ? (
              <button
                className="btn btn-primary px-4 py-2 fw-medium rounded-pill shadow-sm"
                onClick={openSignIn}
                style={{
                  backgroundColor: "lightblue",
                  border: "none",
                  transition: "all 0.3s ease",
                }}
              >
                Login
              </button>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-light d-flex align-items-center gap-2 px-3 py-2 rounded-pill shadow-sm border-0"
                  onClick={toggleUserDropdown}
                  style={{
                    backgroundColor: "#f8f9fa",
                    transition: "all 0.3s ease",
                  }}
                >
                  {user?.imageUrl ? (
                    <img
                      src={user.imageUrl || "/placeholder.svg"}
                      alt="User Avatar"
                      className="rounded-circle"
                      style={{ width: "32px", height: "32px" }}
                    />
                  ) : (
                    <div
                      className="rounded-circle bg-info d-flex align-items-center justify-content-center text-white fw-bold"
                      style={{ width: "32px", height: "32px", fontSize: "14px" }}
                    >
                      {user?.firstName?.charAt(0) || user?.emailAddresses?.[0]?.emailAddress?.charAt(0) || "U"}
                    </div>
                  )}
                  <span className="fw-medium text-dark d-none d-md-inline">{user?.firstName || "User"}</span>
                  <i className={`fa-solid fa-chevron-${isUserDropdownOpen ? "up" : "down"} text-muted`}></i>
                </button>

                {isUserDropdownOpen && (
                  <div
                    className="dropdown-menu show position-absolute end-0 mt-2 shadow-lg border-0 rounded-3 p-0"
                    style={{ minWidth: "280px", zIndex: 1050 }}
                  >
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-bottom bg-light rounded-top">
                      <div className="d-flex align-items-center gap-3">
                        {user?.imageUrl ? (
                          <img
                            src={user.imageUrl || "/placeholder.svg"}
                            alt="User Avatar"
                            className="rounded-circle"
                            style={{ width: "48px", height: "48px" }}
                          />
                        ) : (
                          <div
                            className="rounded-circle bg-info d-flex align-items-center justify-content-center text-white fw-bold"
                            style={{ width: "48px", height: "48px", fontSize: "18px" }}
                          >
                            {user?.firstName?.charAt(0) || user?.emailAddresses?.[0]?.emailAddress?.charAt(0) || "U"}
                          </div>
                        )}
                        <div>
                          <h6 className="mb-0 fw-bold text-dark">
                            {user?.firstName && user?.lastName
                              ? `${user.firstName} ${user.lastName}`
                              : user?.firstName || "User"}
                          </h6>
                          <small className="text-muted">{user?.emailAddresses?.[0]?.emailAddress}</small>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href="/account"
                        className="dropdown-item px-4 py-3 d-flex align-items-center gap-3 text-decoration-none"
                        style={{ transition: "background-color 0.2s ease" }}
                      >
                        <i className="fa-solid fa-user-gear text-info" style={{ width: "20px" }}></i>
                        <span className="fw-medium">Manage Account</span>
                      </Link>

                      <Link
                        to="/bookings"
                        className="dropdown-item px-4 py-3 d-flex align-items-center gap-3 text-decoration-none"
                        style={{ transition: "background-color 0.2s ease" }}
                      >
                        <i className="fa-solid fa-calendar-check text-info" style={{ width: "20px" }}></i>
                        <span className="fw-medium">My Bookings</span>
                      </Link>

                      <hr className="dropdown-divider mx-3" />

                      <button
                        onClick={handleSignOut}
                        className="dropdown-item px-4 py-3 d-flex align-items-center gap-3 text-decoration-none border-0 bg-transparent w-100 text-start"
                        style={{ transition: "background-color 0.2s ease" }}
                      >
                        <i className="fa-solid fa-right-from-bracket text-danger" style={{ width: "20px" }}></i>
                        <span className="fw-medium text-danger">Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {isUserDropdownOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ zIndex: 1040 }}
          onClick={() => setIsUserDropdownOpen(false)}
        ></div>
      )}
    </nav>
  )
}
