import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, 
         getAuth, 
         signInWithEmailAndPassword, 
         updateProfile, 
         signOut, 
         deleteUser, 
         reauthenticateWithCredential, 
         EmailAuthProvider, 
         updatePassword, 
         sendPasswordResetEmail } from "firebase/auth";
import { getDoc, 
         setDoc, 
         doc, 
         collection, 
         getFirestore, 
         updateDoc , 
         deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const collectionRef = collection(db, "user");

const fetch_Data = async () => {
    try {
        const user = auth.currentUser
        const docSnap = await getDoc(doc(collectionRef, user.uid));

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                My_List: data?.My_List || [],
                Liked_List: data?.Liked_List || []
            };
        } 
        else {
            return { My_List: [], Liked_List: [] };
          }
    } 
    catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            closeOnClick: true,
            draggable: true,
        }); 
    }
    
}

const signup = async (name, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, {
            displayName: name,
          });
        await setDoc(doc(collectionRef, user.uid), {
            uid: user.uid,
            Name: name,
            authProvider: "local",
            Email: email,
        });
        toast.success(`Signed In as ${user.displayName}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            closeOnClick: true,
            draggable: true,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            closeOnClick: true,
            draggable: true,
        });
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            closeOnClick: true,
            draggable: true,
        });
    }
}

const logout = async () => {
    await signOut(auth);
}

const deleteUserDetails = async (password) => {
    try {
    const user = auth.currentUser
    const credential = EmailAuthProvider.credential(user.email, password);

    await reauthenticateWithCredential(user, credential).then( async() => {
        await deleteDoc(doc(collectionRef, user.uid));
        await deleteUser(user).then(() => {
            toast.success('Account Deleted', {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
                closeOnClick: true,
                draggable: true,
            });
        }).catch((error) => {
            console.error("Error Deletig user:", error);
            toast.error(error.code.split('/')[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                closeOnClick: true,
                draggable: true,
            });
        });

    }).catch((error) => {
        console.error("Error re-authenticating user:", error);
        alert("Failed to re-authenticate. Please check your password and try again.");
        toast.error(error.code.split('/')[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            closeOnClick: true,
            draggable: true,
        });
    });
        
    } catch (error) {
        console.error("Unable to Delete User", error);
        toast.error(error.code.split('/')[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            closeOnClick: true,
            draggable: true,
        });
    }
    
}

const updateName = async (name) => {
    const user = auth.currentUser
    await updateDoc(doc(collectionRef, user.uid), {
        Name: name
    })
    await updateProfile(user, {
        displayName: name,
    }).then(() => {
        toast.success('Name Updated', {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            closeOnClick: true,
            draggable: true,
        });
        }).catch((error) => {
        toast.error(error.code.split('/')[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            closeOnClick: true,
            draggable: true,
        });
        });
        console.log(user.displayName, user.uid)
}

const changePassword = async (password, newPassword) => {
    const user = auth.currentUser
    const credential = EmailAuthProvider.credential(user.email, password);

    await reauthenticateWithCredential(user, credential).then(() => {
        updatePassword(user, newPassword).then(() => {
            toast.success('Password Updated', {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                closeOnClick: true,
                draggable: true,
            });
          }).catch((error) => {
            toast.error(error.code.split('/')[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                closeOnClick: true,
                draggable: true,
            });
          });
      }).catch((error) => {
        console.error("Error re-authenticating user:", error);
        toast.error(error.code.split('/')[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            closeOnClick: true,
            draggable: true,
        });
      });
}

const ResetPasswordWithEmail = async (email) => {
    await sendPasswordResetEmail(auth, email).then(() => {
    toast.success('Password reset email sent!', {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
        closeOnClick: true,
        draggable: true,
    });
  }).catch((error) => {
    toast.error(error.code.split('/')[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        closeOnClick: true,
        draggable: true,
    });
  });
};

const AddToMyList = async (movie_list) => {
    try {
        const user = auth.currentUser;
        if(user)
        {
            await setDoc(doc(collectionRef, user.uid), {My_List: movie_list}, { merge: true })
        }
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            closeOnClick: true,
            draggable: true,
        });
    }
    
}

const AddToLikes = async (movie_list) => {
    try {
        const user = auth.currentUser;
        if(user)
        {
        await setDoc(doc(collectionRef, user.uid), {Liked_List: movie_list}, { merge: true })
        }
    } catch (error) {
        toast.error(error.code.split('/')[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            closeOnClick: true,
            draggable: true,
        });
    }
    
}


export {auth, 
        db, 
        signup, 
        login, 
        logout, 
        deleteUserDetails, 
        updateName, 
        changePassword, 
        ResetPasswordWithEmail, 
        AddToMyList, 
        AddToLikes, 
        fetch_Data}