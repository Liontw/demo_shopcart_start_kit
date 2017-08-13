import React, { Component } from 'react';
import { Container, Row, Col, Button, Jumbotron, Card, CardImg, CardText, CardBlock,
  CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import AlbumJSON from './Album.json';

import './a.css';

/**
 * 當該項商品已被放入購物車時，則不可再放入。
 * 使用方式 disabled={this.state.cart.find(item = item.id === product.id)}
 * 如果有此商品的id，則會return true, disabled=true則不可以放入。
 */

export default class Content extends Component {
  state = {
    modal: false,
    cart: [],
  }

  addToCart = (product) => {
    const cart = this.state.cart;
    cart.push(product);
    this.setState({
      cart,
    });
    // es6:若新增的state與原本的state同名，則直接寫一個即可。
  }

  checkout = (totalPrice) => {
    alert(`已從你的信用卡扣除${totalPrice}`);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  renderModal = (current, TotalPrice) => (
    <Modal isOpen={current} toggle={this.toggle} >
      <ModalHeader toggle={this.toggle}>購物車</ModalHeader>
      <ModalBody>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>品項</th>
              <th>價格</th>
              <th>數量</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.cart.map((item, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>&#x2b; 1 &#x2212;</td>
                </tr>
              )
              )
            }
            <p>總價︰{TotalPrice}</p>
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => this.checkout(TotalPrice)}>結帳</Button>{' '}
        <Button color="secondary" onClick={this.toggle}>取消</Button>
      </ModalFooter>
    </Modal>
  )

  renderProduct = products =>
    products.map(product => (
      <Col xs="12" md="4">
        <Card>
          <CardImg top width="100%" src={product.img} alt="Card image cap" />
          <CardBlock>
            <CardTitle>{product.title}</CardTitle>
            <CardSubtitle>NT ${product.price}</CardSubtitle>
            <CardText>{product.desc}</CardText>
            <Button
              onClick={() => this.addToCart(product)}
              disabled={this.state.cart.find(item => item.id === product.id)}
            >
              放入購物車
            </Button>
          </CardBlock>
        </Card>
      </Col>
    )
    );

  render() {
    const TotalPrice = this.state.cart.reduce((acc, item) => acc + item.price, 0);
    return (
      <Container>
        <Row>
          <Col md="12">
            <Jumbotron>
              <h1 className="display-3">Welcome to ST.果醬工坊!</h1>
              <p className="lead">這裡有許多好吃又新鮮的手工果醬，只要你想得到的囗味都有製作哦~</p>
              <hr className="my-2" />
              <p>歡迎大家來訂購~</p>
              <p className="lead">
                <Button
                  color="primary"
                  onClick={this.toggle}
                >
                  購物車({this.state.cart.length})
                </Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          {this.renderProduct(AlbumJSON)}
          {/* {
            AlbumJSON.map(product => (
              <Col xs="12" md="4">
                <Card>
                  <CardImg top width="100%" src={product.img} alt="Card image cap" />
                  <CardBlock>
                    <CardTitle>{product.title}</CardTitle>
                    <CardSubtitle>NT ${product.price}</CardSubtitle>
                    <CardText>{product.desc}</CardText>
                    <Button>購買</Button>
                  </CardBlock>
                </Card>
              </Col>
            ))
          } */}
        </Row>
        {this.renderModal(this.state.modal, TotalPrice)}
        {/* <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal> */}
      </Container>
    );
  }
}
