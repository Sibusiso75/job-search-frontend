import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import {Link} from "react-router-dom"

function SignUp() {
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();

    }

    setValidated(true);
  };

  return (
    <Form  style={{margin:"30px"}}noValidate validated={validated} onSubmit={handleSubmit}>
      <h3 >Register</h3>
      <Row className="mb-2">
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          {/* <Form.Label>First name</Form.Label> */}
          <Form.Control
            required
            type="text"
            placeholder="Full Name"
          />
          <Form.Control.Feedback type="invalid">Please provide a valid first name</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom02">
          {/* <Form.Label>Last name</Form.Label> */}
          <Form.Control
            required
            type="email"
            placeholder="Email"
          />
          <Form.Control.Feedback type="invalid">Please provide a valid email</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-2">
        <Form.Group as={Col} md="3" controlId="validationCustom03">
          {/* <Form.Label>Username</Form.Label> */}
            <Form.Control
              type="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid">
            Please provide a valid password.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          {/* <Form.Label>City</Form.Label> */}
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
        <Row className="mb-2">
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          {/* <Form.Label>State</Form.Label> */}
          <Form.Control type="text" placeholder="Province" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid province.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom06">
          {/* <Form.Label>Zip</Form.Label> */}
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
        </Row>

       
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      
      <Link style={{color:"blue"}} to="/login">Already have an account?</Link>
      <p></p>
      <Button type="submit">Register</Button>
    </Form>
  );
}

export default SignUp;