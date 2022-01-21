import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import firebase from "../../firebase";

export default function Signup() {
  const institutionRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [institutions, setInstitutions] = React.useState([]);
  React.useEffect(() => {
    const db = firebase.firestore();
    const dbInstitutions = db
      .collection("Institution")
      .onSnapshot((snapshot) => {
        const institutionData = [];
        snapshot.forEach((doc) =>
          institutionData.push({ ...doc.data(), id: doc.id })
        );
        setInstitutions(institutionData);
      });

    return dbInstitutions;
  }, []);

  console.log(institutions);

  async function handleSubmit(e) {
    console.log(e.preventDefault())
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Inscrever-se</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
          
          
          <Form.Group id="Institution">
            <Form.Label>Instituição</Form.Label>
             
             <Form.Control as= "select" ref={institutionRef}>
              {institutions.map((institution) => (
                <option key={institution.key}>{institution.Nome}</option>
              ))}
             </Form.Control>            
              
            </Form.Group>


            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirmar Senha</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Inscrever-se
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        já tem uma conta? <Link to="/login">Entrar</Link>
      </div>
    </CenteredContainer>
  );
}
