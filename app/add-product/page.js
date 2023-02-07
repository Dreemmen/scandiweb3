"use client"
import { useForm } from 'react-hook-form';
import getObjPropByVar from 'pages/api/helpers/getObjPropByVar';
import getCategories from 'pages/api/requests/getCategories';
import getProductAttributes from 'pages/api/requests/getProductAttributes';
import createProduct from 'pages/api/requests/createProduct';
import { useEffect, useRef, useState } from 'react';
import Topbar from 'app/(components)/Topbar'

export default function AddProduct() {
  const refForm = useRef(null);

  const [dataResponse, setDataResponse] = useState([]); //all categories
  const [selectedOpt, setSelectedOpt] = useState(0);//currently selected product category (type)
  const [productAttributes, setProductAttributes] = useState([]);//all product proporties, parameters 
  const [selectedAttributes, setSelectedAttributes] = useState([]);//currently selected product proporties, parameters 


  //set states after reciving fetched data
  useEffect(() => {
    //first get cattegories (product types)
    getCategories('https://scandiweb3.vercel.app')
    .then(categ => {
      let temp_categ = [];
      categ.results.map(cat => {
        temp_categ[cat.id] = cat;
      })
      setDataResponse(temp_categ);
      setSelectedOpt(categ.results[0].id);
    });
    //second get product proporties, parameters for each category
      getProductAttributes().then(attrib => {
        if(typeof(attrib.results) == 'object'){
          //all product proporties, parameters 
          setProductAttributes(attrib.results);
          //currently selected product proporties, parameters 
          setSelectedAttributes(attrib.results[selectedOpt]);
        }
    });
  }, []);
  
//reac form
    const {
      register,
      handleSubmit,
      formState: {errors, isValid}
    } = useForm({mode: 'onBlur'});
    const requiredMsgText = "Please, submit required data";

    //switching type creates respective additional inputs
    const categoryHandler = async (event) => {
      const SelectedOpt = await event.target.value;
      setSelectedOpt(SelectedOpt);
      setSelectedAttributes(productAttributes[SelectedOpt]);
    }

    //form handler
    const onSubmit = async (data) => {
      data.category_id = selectedOpt;
      data.category_properties = productAttributes[selectedOpt];
      const request = await createProduct('https://scandiweb3.vercel.app', data);
      const response = await request.json();
      const results = await response.results;
      const errors = await response.errors;
      //if request status 500 or 200
      if(errors.length){
        console.log(errors);
      }else if(results == 'true'){
        window.location.href = '/';
      }
      //if no errors(validated) {}
      //console.log(data)
    }
    // type for generic input with error display
    const InputTS = ({inputtype, label, name, value="", requiredMsg}) => {
      const errorMessage = getObjPropByVar(errors, name);
      const hasError = !!(errors && errorMessage);
      return (
        <div>
          <label htmlFor={name}>{label}</label>
          <input {...register(name, {required: requiredMsg?requiredMsg:false, pattern: (inputtype=='number')?/^\d+$/:null})} type={inputtype} name={name} id={name} defaultValue={value}/>
          {hasError && <div className='form_error'>{errorMessage.message}</div>}
        </div>
      );
    };

    //{productAttributes.map( attribute => <InputTS inputtype="text" key={attribute.id}  label={attribute.name} name={attribute} />)}
    //<InputTS inputtype="submit" name="submit" value="Save" />
    return (
      <main className=''>
        <Topbar>
          <div className='link'><a href="#" onClick={() => refForm.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}>Save</a></div>
          <div className='link'><a href="/">Cancel</a></div>
        </Topbar>
        <form ref={refForm} id="product_form" onSubmit={handleSubmit(onSubmit)}>
          <InputTS inputtype="text" label="SKU" name="sku" id="sku" requiredMsg={requiredMsgText} />
          <InputTS inputtype="text" label="Name" name="name" id="name" requiredMsg={requiredMsgText} />
          <InputTS inputtype="number" label="Price" name="price" id="price" requiredMsg={requiredMsgText} />
          <div>
            <label htmlFor='category_id'>Type switcher</label>
            <select name="category_id" id="productType" onChange={categoryHandler}>
              <option  defaultValue='selected'>Type switcher</option>
              {dataResponse.map( option => <option key={option.id} value={option.id}>{option.name}</option>)}
            </select>
          </div>
          <div id="parametr_id">
            {selectedAttributes? (selectedAttributes.map( (attribute, index) => <InputTS inputtype="text" key={index}  label={attribute} name={attribute} id={attribute} />)) : '' }
          </div>
          <div>
            {dataResponse[selectedOpt]?dataResponse[selectedOpt].description:''}
          </div>
        </form>
      </main>
    )
}