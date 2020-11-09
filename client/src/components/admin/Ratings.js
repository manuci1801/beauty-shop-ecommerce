import React from "react";
import axios from "axios";
import { formatDate } from "../../utils/formatDate";

function Ratings({ rates, deleteRate }) {
  const handleDelete = (id) => {
    axios.delete(`/api/rates/${id}`).then((res) => {
      deleteRate(id);
    });
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Product's name
                    </th>
                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Product's image
                    </th>
                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      User's name
                    </th>
                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      User's username
                    </th>
                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Star
                    </th>
                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {typeof rates !== "undefined" && rates.length > 0 ? (
                    rates.map((rate) => (
                      <tr>
                        <td className="px-2 py-4 whitespace-no-wratep">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            {rate.productId.name}
                          </div>
                        </td>
                        <td className="px-2 py-4 h-8 w-8 whitespace-no-wrap">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            {rate.productId ? (
                              <img
                                className="object-cover"
                                src={`/images/${rate.productId.images[0]}`}
                                alt="img"
                              />
                            ) : null}
                          </div>
                        </td>

                        <td className="px-2 py-4 h-8 w-8 whitespace-no-wrap">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            {rate.userId ? rate.userId.name : null}
                          </div>
                        </td>

                        <td className="px-2 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 text-gray-900">
                            {rate.userId ? rate.userId.username : null}
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 text-gray-900">
                            {rate.star}
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 text-gray-900">
                            {rate.description}
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 text-gray-900">
                            {formatDate(rate.createdAt)}
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap text-left text-sm leading-5 font-medium">
                          <button
                            className="whitespace-no-wrap uppercase leading-6 font-medium mx-auto shadow bg-red-800 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white hover:text-white text-md py-2 px-2 rounded button"
                            onClick={() => handleDelete(rate._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="text-center py-4 uppercase font-medium"
                        colSpan={9}
                      >
                        No data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ratings;
