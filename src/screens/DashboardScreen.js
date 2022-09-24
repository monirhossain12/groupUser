import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "../App.css";
import Navbar from "../components/Navbar";
import AddUserToGroupModal from "../components/AddUserToGroupModal";
import AdminGroupCard from "../components/AdminGroupCard";
import UsersGroupCard from "../components/UsersGroupCard";
import { useDispatch, useSelector } from "react-redux";
import { getGroupListActions } from "../store/actions/getGroupListActions";
import { getUserListActions } from "../store/actions/getUserListActions";

const DashboardScreen = () => {
  const [user, setUser] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [assignedGroups, setAssignedGroups] = useState([]);
  const [assignedId, setAssignedId] = useState();
  const [newGroupname, setNewGroupname] = useState();
  const usersRef = collection(db, "users");
  const groupsRef = collection(db, "groups");

  const dispatch = useDispatch();

  //Got all users and group list using redux store
  const allGroupList = useSelector((state) => state?.allGroupList);
  const allUserList = useSelector((state) => state?.allUserList);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });


  //logout functionality
  const logOut = async () => {
    await signOut(auth);
  };

  const setName = (val) => {
    setAssignedId(val?.id);
  };


  //assigning multiple groups before updating database
  const assignGroups = (val) => {
    setAssignedGroups(val?.map((s) => s.id));
  };


  //this function is for creating new group
  const createNewGroup = async () => {
    await addDoc(groupsRef, { name: newGroupname });
    dispatch(getGroupListActions());
  };

  //used to update user group
  const updateUser = async (e) => {
    e.preventDefault();
    const userDoc = doc(db, "users", assignedId);
    await updateDoc(userDoc, { group_id: assignedGroups });
    window.location.reload();
  };

  //Dispatched to get data from firebase
  useEffect(() => {
    dispatch(getGroupListActions());
    dispatch(getUserListActions());
  }, []);

  //used only to get logged in user details including which group a user is in
  useEffect(() => {
    const getUserDetails = async () => {
      const data = await getDocs(usersRef);
      let unfiltered = data?.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserDetails(unfiltered.find((spec) => spec.uid == user.uid));
    };
    getUserDetails();
  }, [user]);

  return (
    <div
      style={{
        background:
          'url("https://venngage-wordpress.s3.amazonaws.com/uploads/2018/09/Simple-Minimalist-Background-Image.jpg") center center/cover',
        height: "100vh",
      }}
    >
      <Navbar logOut={logOut} />

      <div className="container">
        {/* for admin displaying all groups but for users only his groups */}
        {userDetails?.role === "admin" ? (
          <>
            <div className="row">
              <div className="col-12 d-flex justify-content-between m-3 p-3">
                <div className="d-flex  justify-content-around align-items-center p-3">
                  <input
                    style={{
                      height: "35px",
                      borderRadius: "5px",
                      padding: "2px",
                    }}
                    type="text"
                    placeholder="Enter Group Name"
                    onChange={(e) => setNewGroupname(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-success px-1 my-2 mx-2"
                    onClick={createNewGroup}
                  >
                    Create New Group
                  </button>
                </div>

                <div className="d-flex  justify-content-around align-items-center p-3">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    Add User to Groups
                  </button>
                </div>
              </div>
              <div className="col-12 my-2">
                <h5 className="text-white">
                  <strong>Group List</strong>
                </h5>
              </div>
              {allGroupList?.groupList?.length &&
                allGroupList.groupList.map((group) => (
                  <AdminGroupCard
                    users={allUserList?.userList}
                    group={group}
                  />
                ))}
            </div>
          </>
        ) : (
          <div className="row">
            <div className="col-12 my-2">
              <h5 className="text-white">
                <strong>Group List</strong>
              </h5>
            </div>
            {allGroupList?.groupList?.length &&
              allGroupList.groupList.map(
                (group) =>
                  userDetails?.group_id?.find((s) => s == group.id) && (
                    <UsersGroupCard
                      users={allUserList?.userList}
                      group={group}
                    />
                  )
              )}
          </div>
        )}
      </div>

      <AddUserToGroupModal
        updateUser={updateUser}
        setName={setName}
        assignGroups={assignGroups}
        users={allUserList?.userList}
        groups={allGroupList?.groupList}
      />
    </div>
  );
};

export default DashboardScreen;
