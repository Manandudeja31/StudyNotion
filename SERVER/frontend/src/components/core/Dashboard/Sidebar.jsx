/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { logout } from "../../../services/operations/authAPI";
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLink from "./SidebarLink";
import { VscSettingsGear, VscSignOut } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal";
const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);
  if (profileLoading || authLoading) {
    return <div className="mt-10">Loading...</div>;
  }

  return (
    <div>
      <div
        className="flex md:min-w-[222px] h-16 w-full z-10 fixed md:relative bottom-0 flex-col border-r-[1px] border-r-richBlack-700
                md:h-[calc(100vh-3.5rem)] bg-richblue-800 md:py-10"
      >
        <div className="flex md:flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>
        <div className="mx-auto my-6 h-[1px] w-10/12 bg-richBlack-600 hidden md:block"></div>

        <div className="md:flex hidden items-center justify-center">
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are You Sure ?",
                text2: "You will be logged out of your Account",
                btnText: "Logout",
                btn2Text: "Cancel",
                btnHandler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="text-sm font-medium text-richBlack-300"
          >
            <div className="flex items-center px-8 py-2 gap-x-2 ">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;
