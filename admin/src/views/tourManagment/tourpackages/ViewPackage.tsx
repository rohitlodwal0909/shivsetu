import { Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import { imageUrl } from 'src/constants/contant';

type Props = {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  selectedRow: any;
};

const ViewPackage = ({ openModal, setOpenModal, selectedRow }: Props) => {
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
          View Package Details
        </ModalHeader>
        <ModalBody>
          <div className=" mx-auto p-6 bg-white shadow-md rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">
                  Package Name
                </label>
                <p className="text-gray-900">{selectedRow?.package_name || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">Tour Type</label>
                <p className="text-gray-900">{selectedRow?.tour_type || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">State</label>
                <p className="text-gray-900">{selectedRow?.states?.name || '-'}</p>
              </div>{' '}
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">Start City</label>
                <p className="text-gray-900">{selectedRow?.cities?.city || '-'}</p>
              </div>{' '}
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">
                  Duration Days
                </label>
                <p className="text-gray-900">{selectedRow?.duration_days || '-'} Days</p>
              </div>{' '}
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">Price</label>
                <p className="text-gray-900">₹ {selectedRow?.price || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">Max Person</label>
                <p className="text-gray-900">{selectedRow?.max_person || '-'} people</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">Start Date</label>
                <p className="text-gray-900">{selectedRow?.start_date || '-'} </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">End Date</label>
                <p className="text-gray-900">{selectedRow?.end_date || '-'} </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">Inclusions</label>
                <p className="text-gray-900">{selectedRow?.inclusions || '-'} </p>
              </div>{' '}
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">Exclusions</label>
                <p className="text-gray-900">{selectedRow?.exclusions || '-'} </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">Highlights</label>
                <p className="text-gray-900">{selectedRow?.highlights || '-'} </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black-900 mb-1">
                  Banner image
                </label>
                <p className="text-gray-900">
                  <img
                    src={`${imageUrl + 'packages'}/${selectedRow?.banner_image}`}
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
                          src={`${imageUrl}packages/${img}`}
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

export default ViewPackage;
