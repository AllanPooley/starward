import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Gallery from '../../Product/Gallery';
import { Price } from '../../Product/Price';
import { PurchaseOptions } from '../../Product/PurchaseOptions';
import RelatedProducts from '../../Product/RelatedProducts';
import './ProductBlock.scss';

export default class ProductBlock extends Component {
  state = {
    activeVariation: false,
    selectedOptions: {},
    quantity: 1
  };
  addToCartHandler = (event) => {
    event.preventDefault();
    const { product, addToCart } = this.props;
    const { id } = product;
    const { activeVariation, quantity } = this.state;
    const { variation_id: variationId } = activeVariation;
    addToCart(id, quantity, variationId);
  }
  optionSelectHandler = (name, value) => {
    const { selectedOptions } = this.state;
    const newSelectedOptions = {
      ...selectedOptions,
      [name]: value
    };
    this.setState({ selectedOptions: newSelectedOptions });
    this.findMatchingVariant(newSelectedOptions);
  }
  findMatchingVariant = (newSelectedOptions) => {
    const { product } = this.props;
    const { variations } = product;
    const activeVariation = variations.find(variant => _.isEqual(variant.attributes, newSelectedOptions));
    if (activeVariation) {
      this.setState({ activeVariation });
    } else {
      this.setState({ activeVariation: false });
    }
  }
  increaseQuantityHandler = (event) => {
    event.preventDefault();
    const { quantity } = this.state;
    if (quantity < 99) this.setState({ quantity: quantity + 1 });
  }
  decreaseQuantityHandler = (event) => {
    event.preventDefault();
    const { quantity } = this.state;
    if (quantity > 1) this.setState({ quantity: quantity - 1 });
  }
  render() {
    const {
      product,
      description,
      showImageGallery,
      enableImageZoom,
      showPurchaseOptions,
      hasButtons,
      buttons,
      footNotes,
      informationTabs,
      showRelatedProducts,
      relatedProductsTitle
    } = this.props;
    const { activeVariation, selectedOptions, quantity } = this.state;
    const {
      name,
      images,
      regular_price: regularPrice,
      on_sale: onSale,
      sale_price: salePrice,
      attributes,
      type,
      relatedProducts,
      categories,
      variation_attributes: variationAttributes,
      in_stock: inStock,
      price_html: priceHtml,
      // price,
      // sku,
      // id,
      // slug,
      // description,
      // short_description: shortDescription,
      // stock_quantity: stockQuantity,
      // catalog_visibility: catalogVisibility,
    } = product;
    const category = (categories && categories.length > 0) ? categories[0] : false;
    return (
      <section className="product-block">
        <div className="wrap">
          <div className="half-wrap half-wrap--right">
            <div className="breadcrumbs">
              <Link to="/">Home</Link>
              <span className="separator">/</span>
              <Link to={`/${category.slug}/`}>{category.name}</Link>
              <span className="separator">/</span>
              <span>{name}</span>
            </div>
          </div>
          <div className="cols">
            <div className="col gallery-col">
              <Gallery
                onSale={onSale}
                showGallery={showImageGallery}
                images={images}
                enableImageZoom={enableImageZoom}
              />
            </div>
            <div className="col text-col">
              <h1 className="title">{name}</h1>
              { showPurchaseOptions &&
                <Price
                  priceHtml={priceHtml}
                  regularPrice={regularPrice}
                  salePrice={salePrice}
                  productType={type}
                  activeVariation={activeVariation}
                />
              }
              <div className="description" dangerouslySetInnerHTML={{__html: description}} />
              { showPurchaseOptions &&
                <PurchaseOptions
                  attributes={attributes}
                  variationAttributes={variationAttributes}
                  productType={type}
                  inStock={inStock}
                  quantity={quantity}
                  selectedOptions={selectedOptions}
                  increaseQuantityHandler={this.increaseQuantityHandler}
                  decreaseQuantityHandler={this.decreaseQuantityHandler}
                  optionSelectHandler={this.optionSelectHandler}
                  addToCartHandler={this.addToCartHandler}
                />
              }
              <div className="footnotes" dangerouslySetInnerHTML={{__html: footNotes}} />
              { hasButtons && <ButtonGroup buttons={buttons} /> }
            </div>
          </div>
        </div>
        { informationTabs &&
          <InformationTabs tabs={informationTabs} />
        }
        { showRelatedProducts &&
          <RelatedProducts
            title={relatedProductsTitle}
            relatedProducts={relatedProducts}
            addToCartHandler={this.addToCartHandler} />
        }
      </section>
    );
  }
}