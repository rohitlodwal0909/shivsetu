import { Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import { imageUrl } from 'src/constants/contant';

type Props = {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  selectedRow: any;
};

const ViewProduct = ({ openModal, setOpenModal, selectedRow }: Props) => {
  console.log(selectedRow);
  return (
    <div>
      <Modal
        size="3xl"
        show={openModal}
        position="center"
        onClose={() => setOpenModal(false)}
        className="large"
      >
        <ModalHeader className="pb-0 text-center mb-2 font-semibold text-gray-800">
          View Product Details
        </ModalHeader>
        <ModalBody>
          <div className=" mx-auto p-6 bg-white shadow-md rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">
                  Category Name
                </label>
                <p className="text-gray-900">{selectedRow?.category?.name || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">
                  Product Name
                </label>
                <p className="text-gray-900">{selectedRow?.product_name || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">Price</label>
                <p className="text-gray-900">₹{selectedRow?.price || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">MRP</label>
                <p className="text-gray-900">₹{selectedRow?.mrp || '-'}</p>
              </div>{' '}
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">
                  Discount Percent
                </label>
                <p className="text-gray-900">{selectedRow?.discount_percent || '-'}</p>
              </div>{' '}
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">Stock (Qty)</label>
                <p className="text-gray-900">{selectedRow?.stock_quantity || '-'}</p>
              </div>{' '}
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">
                  Short Description
                </label>
                <p className="text-gray-900"> {selectedRow?.short_description || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">
                  {' '}
                  Full description
                </label>
                <div
                  className="prose max-w-none text-gray-900"
                  dangerouslySetInnerHTML={{
                    __html: selectedRow?.full_description || '<p>-</p>',
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">image</label>
                <p className="text-gray-900">
                  <img
                    src={`${imageUrl + 'products'}/${selectedRow?.image}`}
                    alt="Banner"
                    className="h-20 w-20 object-cover rounded"
                  />
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">Gallery</label>
                <p className="text-gray-900">
                  {selectedRow?.gallery?.length ? (
                    <div className="flex gap-3 flex-wrap">
                      {JSON.parse(selectedRow?.gallery).map((img: string, index: number) => (
                        <img
                          key={index}
                          src={`${imageUrl}products/${img}`}
                          alt={`Gallery-${index}`}
                          className="h-20 w-20 object-cover rounded border"
                        />
                      ))}
                    </div>
                  ) : (
                    <p>No Images</p>
                  )}
                </p>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
};

export default ViewProduct;
