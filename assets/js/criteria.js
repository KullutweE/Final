
const modalWrapperc = document.querySelector('.modal-wrapperc');
// modal add
const addModalc = document.querySelector('.add-modalc');
// btnAddc.addEventListener('click', () => {
//     console.log("works")
//   });
const addModalcForm2 = document.querySelector('.add-modalc .form');

// modal edit
const editModalc = document.querySelector('.edit-modalc');
const editModalcForm2 = document.querySelector('.edit-modalc .form');

const btnAddc = document.querySelector('.btn-addc');

const tableUsersc = document.querySelector('.table-usersc');

let idc;

// Create element and render users
const renderUserc = doc => {
  const tr = `
    <tr data-idc='${doc.id}'>
      <td>${doc.data().Name}</td>
      <td>${doc.data().Rate}</td>
      <td>${doc.data().Description}</td>
      <td>
        <button class="btn btn-editc">Edit</button>
        <button class="btn btn-deletec">Delete</button>
      </td>
    </tr>
  `;
  tableUsersc.insertAdjacentHTML('beforeend', tr);

  // Click edit user
  const btnEdit = document.querySelector(`[data-idc='${doc.id}'] .btn-editc`);
  btnEdit.addEventListener('click', () => {
    editModalc.classList.add('modal-showc');
    idc = doc.id;
    editModalcForm2.Name.value = doc.data().Name;
    editModalcForm2.Rate.value = doc.data().Rate;
    editModalcForm2.Description.value = doc.data().Description;

  });

  // Click delete user
  const btnDelete = document.querySelector(`[data-idc='${doc.id}'] .btn-deletec`);

  btnDelete.addEventListener('click', () => {
    //add confirmation code

    db.collection('Criteria').doc(`${doc.id}`).delete().then(() => {
      console.log('Document succesfully deleted!');
      alert('Judge account deleted succesfully!')
    }).catch(err => {
      console.log('Error removing document', err);
      alert('Error removing Judge account',err);

    });
  });
}

// Click add user button
btnAddc.addEventListener('click', () => {
  addModalc.classList.add('modal-showc');

  addModalcForm2.Name.value = '';
  addModalcForm2.Rate.value = '';
  addModalcForm2.Description.value = '';
});

// User click anyware outside the modal
window.addEventListener('click', e => {
  if(e.target === addModalc) {
    addModalc.classList.remove('modal-showc');
  }
  if(e.target === editModalc) {
    editModalc.classList.remove('modal-showc');
  }
});

// Get all users
// db.collection('users').get().then(querySnapshot => {
//   querySnapshot.forEach(doc => {
//     renderUserc(doc);
//   })
// });

// Real time listener
db.collection('Criteria').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderUserc(change.doc);
    }
    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-idc='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsersc.removeChild(tbody);
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-idc='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsersc.removeChild(tbody);
      renderUserc(change.doc);
    }
  })
})

// Click submit in add modal
addModalcForm2.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('Criteria').add({
    Name: addModalcForm2.Name.value,
    Rate: addModalcForm2.Rate.value,
    Description: addModalcForm2.Description.value,
  });
  modalWrapperc.classList.remove('modal-showc');
});

// Click submit in edit modal
editModalcForm2.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('Criteria').doc(idc).update({
    Name: editModalcForm2.Name.value,
    Rate: editModalcForm2.Rate.value,
    Description: editModalcForm2.Description.value,
  });
  editModalc.classList.remove('modal-showc');
  
});
