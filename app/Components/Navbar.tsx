import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Sidebar } from 'primereact/sidebar';

export default function Navbar() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible(prev => !prev);
  };

  // Close dropdown when clicking outside
  const closeProfileDropdown = () => {
    setProfileDropdownVisible(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <div className="surface-0 shadow-2 flex justify-content-between align-items-center px-3 py-2 lg:px-6 relative z-5">
        {/* Logo and Mobile Menu */}
        <div className="flex align-items-center">
          <Button 
            icon="pi pi-bars" 
            className="p-button-text p-button-rounded lg:hidden mr-3" 
            onClick={() => setSidebarVisible(true)}
            aria-label="Menu"
          />
          <span className="text-xl font-bold text-primary">Mosque Locator</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="flex list-none p-0 m-0">
            <li className="px-3 py-2 cursor-pointer hover:text-primary transition-colors transition-duration-150">
              <span className="pi pi-home mr-2"></span>
              <span>Home</span>
            </li>
            <li className="px-3 py-2 cursor-pointer hover:text-primary transition-colors transition-duration-150">
              <span className="pi pi-book mr-2"></span>
              <span>Quran</span>
            </li>
            <li className="px-3 py-2 cursor-pointer hover:text-primary transition-colors transition-duration-150">
              <span className="pi pi-clock mr-2"></span>
              <span>Prayer Times</span>
            </li>
            <li className="px-3 py-2 cursor-pointer hover:text-primary transition-colors transition-duration-150">
              <span className="pi pi-envelope mr-2"></span>
              <span>Contact Us</span>
            </li>
          </ul>
        </div>
        
        {/* Profile Section */}
        <div className="flex align-items-center">
          {/* <Button 
            type="button" 
            className="p-button-rounded p-button-text" 
            icon="pi pi-bell" 
            badge="2" 
            badgeClassName="p-badge-danger" 
            aria-label="Notifications"
          /> */}
          <div className="relative ml-2">
            <Avatar 
              image="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" 
              shape="circle" 
              className="cursor-pointer" 
              onClick={toggleProfileDropdown} 
              aria-label="Profile"
            />
            
            {/* Custom dropdown menu */}
            {profileDropdownVisible && (
              <>
                <div 
                  className="fixed top-0 left-0 w-full h-full" 
                  onClick={closeProfileDropdown} 
                  style={{ zIndex: 999 }}
                ></div>
                <div 
                  className="absolute right-0 mt-2 w-48 shadow-lg bg-white rounded-md overflow-hidden z-max"
                  style={{ zIndex: 1000 }}
                >
                  <div className="py-1">
                    <a className="flex align-items-center px-4 py-2 hover:surface-100 cursor-pointer">
                      <i className="pi pi-user mr-2"></i>
                      <span>Profile</span>
                    </a>
                    <a className="flex align-items-center px-4 py-2 hover:surface-100 cursor-pointer">
                      <i className="pi pi-cog mr-2"></i>
                      <span>Settings</span>
                    </a>
                    <a className="flex align-items-center px-4 py-2 hover:surface-100 cursor-pointer">
                      <i className="pi pi-heart mr-2"></i>
                      <span>Favorites</span>
                    </a>
                    <div className="border-t border-gray-200"></div>
                    <a className="flex align-items-center px-4 py-2 hover:surface-100 cursor-pointer">
                      <i className="pi pi-sign-out mr-2"></i>
                      <span>Sign Out</span>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} className="p-0 w-18rem">
        <div className="px-4 py-3 surface-200">
          <span className="text-xl font-bold text-primary">Mosque Locator</span>
        </div>
        <div className="p-3">
          <ul className="list-none p-0 m-0">
            <li className="mb-2">
              <a className="p-3 flex align-items-center cursor-pointer hover:surface-200 border-round transition-colors transition-duration-150">
                <i className="pi pi-home mr-2"></i>
                <span>Home</span>
              </a>
            </li>
            <li className="mb-2">
              <a className="p-3 flex align-items-center cursor-pointer hover:surface-200 border-round transition-colors transition-duration-150">
                <i className="pi pi-book mr-2"></i>
                <span>Quran</span>
              </a>
            </li>
            <li className="mb-2">
              <a className="p-3 flex align-items-center cursor-pointer hover:surface-200 border-round transition-colors transition-duration-150">
                <i className="pi pi-clock mr-2"></i>
                <span>Prayer Times</span>
              </a>
            </li>
            <li className="mb-2">
              <a className="p-3 flex align-items-center cursor-pointer hover:surface-200 border-round transition-colors transition-duration-150">
                <i className="pi pi-envelope mr-2"></i>
                <span>Contact Us</span>
              </a>
            </li>
          </ul>
        </div>
      </Sidebar>
    </>
  );
} 