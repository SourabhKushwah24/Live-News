import React, { useEffect, useState } from "react";
import product from "../images/products/adderall.jpg";
import { useNavigate } from "react-router-dom";

export const Apicall = () => {
  useEffect(() => {
    getPost();
  }, []);

  const [posts, setPosts] = useState([]);

  const getPost = () => {
    var formdata = new FormData();
    formdata.append("appKey", "ec7e6cc139d9c80d0fdd15b07b95aaf7");
    formdata.append("_operation", "GetDetails");
    formdata.append("mode", "getAllSubCategory");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    fetch(
      "http://192.168.1.10/yugox/projects/Local/medicationorder/modules/ReportPortal/api.php",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        var sub_categories = data.result[0].sub_categories;
        setPosts(sub_categories);
        console.log(sub_categories);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  
  return (
    <>
      {/* {posts} */}
      {/* {posts.map(function (productSpec, i) {
          return (
            <span key={i}>
            {productSpec.subcategory_tks_subcategory} <br />
            </span>
            );
          })} */}

      <div className="clearfix">
        <div className="row">
          {posts.map((data) => {
            if (data.subcategory_tks_brandname !== "") {
              return (
                <div className="col-md-4 " key={data.subcategoryid}>
                  <div className="card mt-4">
                    <div className="card-body">
                      <div className="avatar text-center">
                        <img src={product} alt="" />
                      </div>
                    </div>
                    <h5 className="card-title text-center">
                      {data.subcategory_tks_brandname}
                    </h5>
                    <div className="col-xs-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-primary mb-3 w-50"
                        onClick={handleGoToMenu}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};
