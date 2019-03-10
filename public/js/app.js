class ProductList extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.setState({ products: Seed.products })
  }

  handleProductUpVote = (productId) => {
    console.log(`${productId} was upvoted.`)
    /* traverse the products array
    Importantly, map() returns a new array as opposed to modifying the array this.state.products. */
    const nextProducts = this.state.products.map((product) => {
      /* check if the current product matches productId */
      if (product.id === productId) {
        /* overwrite the votes property on the new product object and increment vote count */ 
        return Object.assign({}, product, {
          votes: product.votes + 1,
        })
      }
      /* If the current product is not the one specified by productId, we return it unmodified: */
      else {
        return product;
      }
    })
    this.setState({
      products: nextProducts,
    });
  }

  handleProductDownVote = (productId) => {
    console.log(`${productId} was down voted.`)
    const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: product.votes - 1,
        })
      }
      else {
        return product;
      }
    })
    this.setState({
      products: nextProducts,
    });
  }


  render() {
    const products = this.state.products.sort((a, b) => (
      b.votes - a.votes
    ));
    const productComponents = products.map((product) => (
      <Product
        key={`product-${product.id}`}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onUpVote={this.handleProductUpVote}
        onDownVote={this.handleProductDownVote}
      />
    ))
    return (
      <div className='ui unstackable items'>
        {productComponents}
      </div>
    );
  }
}

class Product extends React.Component {

  handleUpVote = () => (
    this.props.onUpVote(this.props.id)
  )

  handleDownVote = () => (
    this.props.onDownVote(this.props.id)
  )

  render() {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.productImageUrl} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUpVote}>
              <i className='larget caret up icon' />
            </a>
            {this.props.votes}
            <a onClick={this.handleDownVote}>
              <i className='larget caret down icon' />
            </a>
          </div>
          <div className='description'>
            <a href={this.props.url}>
              {this.props.title}
            </a>
            <p>{this.props.description}</p>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);