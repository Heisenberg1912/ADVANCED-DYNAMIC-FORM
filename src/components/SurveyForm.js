import React, { useState } from 'react';
import useFormValidation from '../hooks/useFormValidation';
import useFetchAPI from '../hooks/useFetchAPI';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    surveyTopic: "",
    favoriteProgrammingLanguage: "",
    yearsOfExperience: "",
    exerciseFrequency: "",
    dietPreference: "",
    highestQualification: "",
    fieldOfStudy: "",
    feedback: ""
  });

  const { errors, validate } = useFormValidation();

  const { data: additionalQuestions, loading, error } = useFetchAPI(
    formData.surveyTopic ? `https://api.example.com/questions?topic=${formData.surveyTopic}` : null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validate(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.keys(formData).forEach((key) => validate(key, formData[key]));

    if (Object.values(errors).every((error) => error === "")) {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p>{errors.fullName}</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Survey Topic</label>
          <select
            name="surveyTopic"
            value={formData.surveyTopic}
            onChange={handleChange}
          >
            <option value="">Select a topic</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
        </div>
        {formData.surveyTopic === "Technology" && (
          <>
            <div className="form-group">
              <label>Favorite Programming Language</label>
              <select
                name="favoriteProgrammingLanguage"
                value={formData.favoriteProgrammingLanguage}
                onChange={handleChange}
              >
                <option value="">Select a language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
              </select>
            </div>
            <div className="form-group">
              <label>Years of Experience</label>
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        {formData.surveyTopic === "Health" && (
          <>
            <div className="form-group">
              <label>Exercise Frequency</label>
              <select
                name="exerciseFrequency"
                value={formData.exerciseFrequency}
                onChange={handleChange}
              >
                <option value="">Select frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Rarely">Rarely</option>
              </select>
            </div>
            <div className="form-group">
              <label>Diet Preference</label>
              <select
                name="dietPreference"
                value={formData.dietPreference}
                onChange={handleChange}
              >
                <option value="">Select preference</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
            </div>
          </>
        )}
        {formData.surveyTopic === "Education" && (
          <>
            <div className="form-group">
              <label>Highest Qualification</label>
              <select
                name="highestQualification"
                value={formData.highestQualification}
                onChange={handleChange}
              >
                <option value="">Select qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            <div className="form-group">
              <label>Field of Study</label>
              <input
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label>Feedback</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
          />
          {errors.feedback && <p>{errors.feedback}</p>}
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
        {loading && <p className="loading">Loading additional questions...</p>}
        {error && <p className="error">Error fetching additional questions</p>}
        {additionalQuestions && (
          <div className="additional-questions">
            <h3>Additional Questions</h3>
            {additionalQuestions.map((question, index) => (
              <div className="form-group" key={index}>
                <label>{question.text}</label>
                <input
                  type="text"
                  name={`additionalQuestion_${index}`}
                  value={formData[`additionalQuestion_${index}`] || ""}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SurveyForm;
