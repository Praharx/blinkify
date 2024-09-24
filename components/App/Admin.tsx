import React, { useState, useEffect } from "react";
import AdminLayout from "./Admin/AdminLayout";
import UnverifiedBounties from "./Admin/UnverifiedBounties";
import axios from "axios";
import {toast, Toaster} from "sonner"

export const runtime = "edge";

const AdminPage = ({ userEmail }: { userEmail: string | undefined }) => {
  // Initially, the bounties array is empty
  const [blinks, setBlinks] = useState([]);
  
  useEffect(() => {
    (async () => {
      const reponse = await axios.get(
        `${window.location.origin}/api/allBlinks`,
      );

      if (!reponse.data.success) {
        toast("Invalid request");
      }

      console.log("all blinks:" , reponse.data.data)

      setBlinks(reponse.data.data);
    })();
  }, []);

  return (
    <div>
      {userEmail == "ktmedia23@gmail.com" || userEmail == "harshana555prajapati@gmail.com" ? (
        <AdminLayout>
          <UnverifiedBounties blinks={blinks} />
          <Toaster/>
        </AdminLayout>
      ) : (
        <div>
          <div >You are not authorized to access this page</div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;