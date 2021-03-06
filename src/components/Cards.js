import React, { Component } from 'react';
import Card from './Card';
import * as RequestStates from '../actions/RequestStates';
import unescape from 'unescape';

class Cards extends Component {
    componentDidMount = () => {
        let item = this.props.match.params.item;

        if ((item !== null && this.props.searchState.searchResults.length == 0) || (item != this.props.searchState.searchTerm)) {
            this.props.getSearchResults(item);
        }
    }

    render() {
        var searchResults = this.props.searchState.searchResults;
        let CardComponents = null;
        if (this.props.searchState.requestState === RequestStates.REQUEST_COMPLETE) {

            CardComponents = searchResults.map((item, index) => {
                var cardImage = (item.mediumImage) ? item.mediumImage : "/img/notfound.jpg";
                var textLink = (item.retailer === "Amazon") ? "Go to Amazon" : "Go to Walmart";
                var shortDescription = (item.retailer === "Walmart")? unescape(item.shortDescription, 'all'): item.shortDescription
                return <Card
                    name={item.name}
                    salePrice={item.salePrice}
                    shortDescription={shortDescription}
                    image={cardImage}
                    key={index}
                    productUrl={item.productURL}
                    urlText={textLink}
                />
            });

        } else {
            CardComponents =
                <div className="col s12 m12 l12" >
                    <div className="banner-content">
                        <img src="/img/loadinggif.gif" />
                    </div>
                </div>;
        }


        return (
            <div>
                {CardComponents}
            </div>
        )
    }
}

export default Cards;