import { useEffect, useState } from "react";
import useEstimate from "../../hooks/useEstimate";
import "./hire.css";

import { getFirestore, addDoc, collection } from "firebase/firestore";
import { app } from "../../utils/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { usePhotographers } from "../../hooks/usePhotographers";
import { hireFormValidator } from "../../utils/validators";

const Hire = () => {
  const fireStore = getFirestore(app);
  const navigate = useNavigate();
  const location = useLocation();

  const { auth, isSignedIn } = useAuth();
  const { estimationObj, estimation } = useEstimate();
  const {
    getPhotographerProfile,
    getPhotographerList,
    photographers,
    loading,
    profile,
  } = usePhotographers();
  const [personalDetails, setPersonalDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    additionalInformation: "",
    location: "",
    date: "",
    photographer: "",
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSignedIn) return;
    if (!auth.currentUser) return;
    setPersonalDetails({
      fullName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      phone: auth.currentUser.phoneNumber,
      additionalInformation: "",
      location: "",
      date: "",
      photographer: "",
    });
  }, [auth.currentUser, isSignedIn]);

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const pl = search.get("pid");
    if (!pl.length) getPhotographerList();
    getPhotographerProfile(pl);
    setPersonalDetails((prev) => ({ ...prev, photographer: pl }));
  }, [location.search]);

  useEffect(() => {
    if (!photographers.length) return;
    setPersonalDetails((prev) => ({
      ...prev,
      photographer: photographers[0].id,
    }));
  }, [photographers]);

  const updatePersonalInfo = (field) => (e) => {
    setPersonalDetails((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    if (isLoading) return;
    e.preventDefault();
    const estimationData = estimation
      ? {
          ...estimationObj,
          estimation,
        }
      : null;
    setLoading(true);
    try {
      console.log({ personalDetails });
      const validated = await hireFormValidator(personalDetails);
      const _doc = await addDoc(collection(fireStore, "hire_requests"), {
        estimationData,
        personalDetails: validated,
      });
      alert(`Reference ID: ${_doc.id}`);
      navigate("/");
    } catch (err) {
      console.log({ err });
      if (err.name === "ValidationError") {
        alert(err.message);
      } else {
        alert("There was a problem requesting. Please, try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="hire">
        <div className="hire__wrapper">
          <form onSubmit={onSubmit}>
            {/* header */}
            <div className="hire__header">
              <h2>
                Offer <span>Proposal</span>
              </h2>
              <div className="offer__details">
                <p>Thank you for considering Groot Photography.</p>
                <p>
                  This is your first step. Please, fill in your information
                  below and I will be in touch with you ASAP.
                </p>
              </div>
            </div>
            {/* body */}
            <div className={`hire__body ${isLoading ? "loading" : ""}`}>
              {/* estimation */}
              <div className="estimate__details">
                {/* photographer */}
                <div className="photographers__select">
                  <h2>Selected Photographer</h2>
                  {loading && <p>Loading...</p>}
                  {!loading && profile.data && <h4>{profile.data.fullName}</h4>}
                  {!loading && !profile.data && (
                    <select
                      value={personalDetails.photographer}
                      onChange={updatePersonalInfo("photographer")}
                    >
                      {photographers.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.fullName}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="est">
                  <h2>Estimation Details</h2>
                  {estimation ? (
                    <>
                      <p>Your estimation is: NRS {estimation}</p>
                    </>
                  ) : (
                    <>You are proceeding without estimation data.</>
                  )}
                </div>
              </div>
              {/* form */}
              <div className="hire__form">
                {/* event */}
                <div className="event__details">
                  <h2>Event Details</h2>
                  <div className="input__field">
                    <label htmlFor="venue">Venue</label>
                    <input
                      type="venue"
                      required
                      placeholder="Location of event"
                      value={personalDetails.location}
                      onChange={updatePersonalInfo("location")}
                    />
                  </div>
                  <div className="input__field">
                    <label htmlFor="eventDate">Date</label>
                    <input
                      id="eventDate"
                      type="date"
                      required
                      placeholder="Event start date"
                      value={personalDetails.date}
                      onChange={updatePersonalInfo("date")}
                    />
                  </div>
                </div>
                <div>
                  <h2>Personal Details</h2>

                  <div className="input__field">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={personalDetails.fullName}
                      onChange={updatePersonalInfo("fullName")}
                    />
                  </div>
                  <div className="input__field">
                    <label htmlFor="phone">Phone</label>
                    <input
                      required
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      name="phone"
                      id="phone"
                      value={personalDetails.phone}
                      onChange={updatePersonalInfo("phone")}
                    />
                  </div>
                  <div className="input__field optional">
                    <label htmlFor="phone">Additional Information</label>
                    <textarea
                      name="additionalInfo"
                      id="additionalInfo"
                      rows={6}
                      value={personalDetails.additionalInformation}
                      onChange={updatePersonalInfo("additionalInformation")}
                    ></textarea>
                  </div>
                  <button disabled={isLoading} type="submit">
                    Confirm Proposal
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Hire;
