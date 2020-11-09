import React from "react";

function Dashboard({ users, products, brands, news, contacts }) {
  return (
    <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
      {/*Console Content*/}
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          {/*Metric Card*/}
          <div className="bg-white border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-green-600">
                  <i className="fa fa-users fa-2x fa-fw fa-inverse" />
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-500">
                  Total users
                </h5>
                <h3 className="font-bold text-3xl">{users.length}</h3>
              </div>
            </div>
          </div>
          {/*/Metric Card*/}
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          {/*Metric Card*/}
          <div className="bg-white border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-orange-600">
                  <i className="fas fa-truck fa-2x fa-fw fa-inverse" />
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-500">
                  Total products
                </h5>
                <h3 className="font-bold text-3xl">
                  {products ? products.length : null}
                </h3>
              </div>
            </div>
          </div>
          {/*/Metric Card*/}
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          {/*Metric Card*/}
          <div className="bg-white border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-yellow-600">
                  <i className="fas fa-copyright fa-2x fa-fw fa-inverse" />
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-500">
                  Total brands
                </h5>
                <h3 className="font-bold text-3xl">
                  {brands ? brands.length : null}
                </h3>
              </div>
            </div>
          </div>
          {/*/Metric Card*/}
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          {/*Metric Card*/}
          <div className="bg-white border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-yellow-600">
                  <i className="fas fa-newspaper fa-2x fa-fw fa-inverse" />
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-500">
                  Total news
                </h5>
                <h3 className="font-bold text-3xl">
                  {news ? news.length : null}
                </h3>
              </div>
            </div>
          </div>
          {/*/Metric Card*/}
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          {/*Metric Card*/}
          <div className="bg-white border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-blue-600">
                  <i className="fas fa-chart-bar fa-2x fa-fw fa-inverse" />
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-500">
                  Total ratings
                </h5>
              </div>
            </div>
          </div>
          {/*/Metric Card*/}
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          {/*Metric Card*/}
          <div className="bg-white border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-indigo-600">
                  <i className="fas fa-tasks fa-2x fa-fw fa-inverse" />
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-500">
                  Total contacts
                </h5>
                <h3 className="font-bold text-3xl">{contacts.length}</h3>
              </div>
            </div>
          </div>
          {/*/Metric Card*/}
        </div>
      </div>
      {/*Divider*/}
    </div>
  );
}

export default Dashboard;
