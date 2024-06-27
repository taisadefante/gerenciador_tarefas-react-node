import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link, Route } from "react-router-dom";
import Tarefa from "../../models/tarefa.model";
import Listar from "../Listar/Listar";
import Style from "./cadastrar.module.css";

function Cadastrar() {
  const [tarefa, setTarefa] = useState("");
  const [formValidado, setFormValidado] = useState(false);
  const [exibirModal, setExibirModal] = useState(false);

  function cadastrar(event) {
    event.preventDefault();
    setFormValidado(true);
    if (event.currentTarget.checkValidity() === true) {
      //obtem as tarefas
      const tarefasDb = localStorage["tarefas"];
      const tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];

      //persiste a tarefa
      tarefas.push(new Tarefa(new Date().getTime(), tarefa, false));
      localStorage["tarefas"] = JSON.stringify(tarefas);
      setExibirModal(true);
    }
  }

  function handletxtTarefa(event) {
    setTarefa(event.target.value);
  }

  function handleFecharModal() {
    <Route path="/" element={<Listar />} />;
  }

  return (
    <div className="text-center">
      <h1>Cadastrar</h1>

      <div>
        <Form validated={formValidado} noValidate onSubmit={cadastrar}>
          <Form.Group>
            <Form.Label>Tarefa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite a tarefa"
              minLength="5"
              maxLength="100"
              required
              value={tarefa}
              onChange={handletxtTarefa}
            />
            <Form.Control.Feedback type="invalid">
              A tarefa deve conter ao menos 5 caracteres.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="text-center">
            <Button variant="success" type="submit">
              Cadastrar
            </Button>
            &nbsp;
            <Link to="/" className="btn btn-light">
              Voltar
            </Link>
          </Form.Group>
        </Form>
        <Modal show={exibirModal} onHide={handleFecharModal}>
          <Modal.Header closeButton>
            <Modal.Title>Sucesso</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tarefa adicionada com sucesso!</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleFecharModal}>
              <Link to="/" variant="success" className={Style.link_continuar}>
                Continuar
              </Link>
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <footer>
        <span>
          Copyright © 2023 Tais Defante . Todos os direitos reservados.
        </span>
        <br />
        <span>Contato: taisadefante@hotmail.com</span>
      </footer>
    </div>
  );
}

export default Cadastrar;
