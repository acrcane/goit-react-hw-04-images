import { Notify } from "notiflix";
// import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { SearchbarWrap, Form, SearchFormBtn, SearchFormBtnLabel, SearchInput } from "./Searchbar.styled";

const Searchbar = ({onSubmit}) => {

    const [searchName, setSearshName] = useState('');


    const onImputChange = (event) => {
            const searchName = event.target.value;
            setSearshName(searchName);
    }


    const onClickSearchBtn = (event) => {
        event.preventDefault();



        if (searchName.trim().toLowerCase()) {
                onSubmit(searchName); 
                setSearshName(''); 
        } else {
                Notify.failure('Fill in the search field');
        }
    };


    
    return(
        <SearchbarWrap>
            <Form>
            <SearchFormBtn
                type = "submit" 
                className = "button" 
                onClick = { onClickSearchBtn }
            >
                <SearchFormBtnLabel>
                    Search
                </SearchFormBtnLabel>
            </SearchFormBtn>

            <SearchInput
                className = "input"
                name = "input"
                type = "text"
                autoComplete = "off"
                autoFocus
                placeholder = "Search images and photos"
                maxLength = '20'
                value = { searchName }
                onChange = { onImputChange }
            />
            </Form>
        </SearchbarWrap>
    )
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default Searchbar