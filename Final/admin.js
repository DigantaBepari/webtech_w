 // --- DATA STATE ---
        let services = [
            { id: 101, name: 'Oil Change - Synthetic', price: 79.99 },
            { id: 102, name: 'Brake Pad Replacement', price: 150.00 },
            { id: 103, name: 'Engine Diagnostic', price: 45.00 },
            { id: 104, name: 'Tire Rotation', price: 25.00 }
        ];

        let parts = [
            { id: 201, name: 'Brake Pads (Ceramic)', price: 60.00, stock: 12, img: 'https://picsum.photos/seed/brake/50/50' },
            { id: 202, name: 'Oil Filter (Type A)', price: 15.50, stock: 45, img: 'https://picsum.photos/seed/oil/50/50' },
            { id: 203, name: 'Spark Plug (Set of 4)', price: 32.00, stock: 3, img: 'https://picsum.photos/seed/spark/50/50' } 
        ];

        let users = [
            { id: 301, name: 'John Admin', email: 'john@autofix.com', role: 'Admin' },
            { id: 302, name: 'Sarah Mechanic', email: 'sarah@autofix.com', role: 'Manager' },
            { id: 303, name: 'Mike Customer', email: 'mike@gmail.com', role: 'Customer' }
        ];

        // --- NAVIGATION & RESPONSIVENESS ---
        function toggleMobileMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('open');
        }

        function showSection(sectionId, navElement) {
            // Hide all sections
            document.querySelectorAll('.section-view').forEach(sec => sec.classList.remove('active'));
            // Show target
            document.getElementById(sectionId).classList.add('active');
            
            // Handle Mobile Nav
            document.getElementById('navLinks').classList.remove('open'); // Close menu on click

            // Update Title
            const titles = {
                'dashboard': 'Dashboard Overview',
                'services': 'Manage Services',
                'parts': 'Inventory Management',
                'users': 'User Management'
            };
            const titleElem = document.querySelector(`#${sectionId} header h1`);
            if(titleElem) titleElem.innerText = titles[sectionId];

            // Update Active State on Links (if clicked from navbar)
            if (navElement) {
                document.querySelectorAll('.nav-link').forEach(item => item.classList.remove('active'));
                navElement.classList.add('active');
            } else {
                // If triggered programmatically (like clicking logo), find correct link
                document.querySelectorAll('.nav-link').forEach(item => {
                    item.classList.remove('active');
                    if(item.getAttribute('onclick').includes(sectionId)) {
                        item.classList.add('active');
                    }
                });
            }

            renderAll();
        }

        // --- RENDERING LOGIC ---
        function renderAll() {
            renderServices();
            renderParts();
            renderUsers();
            updateStats();
        }

        function renderServices() {
            const tbody = document.getElementById('services-table-body');
            tbody.innerHTML = '';
            services.forEach(s => {
                tbody.innerHTML += `
                    <tr>
                        <td>#${s.id}</td>
                        <td>${s.name}</td>
                        <td>$${parseFloat(s.price).toFixed(2)}</td>
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="openModal('service', ${s.id})"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-danger" onclick="deleteItem('service', ${s.id})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `;
            });
        }

        function renderParts() {
            const tbody = document.getElementById('parts-table-body');
            tbody.innerHTML = '';
            parts.forEach(p => {
                let stockClass = p.stock < 5 ? 'stock-low' : 'stock-ok';
                let stockText = p.stock < 5 ? 'Low Stock' : 'In Stock';
                
                tbody.innerHTML += `
                    <tr>
                        <td><img src="${p.img}" class="part-img" alt="Part"></td>
                        <td>${p.name}</td>
                        <td>$${parseFloat(p.price).toFixed(2)}</td>
                        <td><span class="stock-badge ${stockClass}">${p.stock} (${stockText})</span></td>
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="openModal('part', ${p.id})"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-danger" onclick="deleteItem('part', ${p.id})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `;
            });
        }

        function renderUsers() {
            const tbody = document.getElementById('users-table-body');
            tbody.innerHTML = '';
            users.forEach(u => {
                tbody.innerHTML += `
                    <tr>
                        <td>#${u.id}</td>
                        <td>${u.name}</td>
                        <td>${u.email}</td>
                        <td><span style="font-weight:500; color:var(--primary)">${u.role}</span></td>
                        <td>
                            <button class="btn btn-sm btn-danger" onclick="deleteItem('user', ${u.id})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `;
            });
        }

        function updateStats() {
            document.getElementById('stat-services').innerText = services.length;
            document.getElementById('stat-users').innerText = users.length;
            const lowStock = parts.filter(p => p.stock < 5).length;
            document.getElementById('stat-stock').innerText = lowStock;
        }

        // --- CRUD MODAL LOGIC ---
        function openModal(type, id = null) {
            const modal = document.getElementById('modal-overlay');
            const formFields = document.getElementById('form-fields');
            const title = document.getElementById('modal-title');
            const editIdInput = document.getElementById('edit-id');
            const typeInput = document.getElementById('item-type');

            typeInput.value = type;
            editIdInput.value = id || '';
            formFields.innerHTML = '';

            let data = null;
            if(id) {
                if(type === 'service') data = services.find(x => x.id === id);
                if(type === 'part') data = parts.find(x => x.id === id);
                if(type === 'user') data = users.find(x => x.id === id);
                title.innerText = `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`;
            } else {
                title.innerText = `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`;
            }

            if (type === 'service') {
                formFields.innerHTML = `
                    <div class="form-group">
                        <label>Service Name</label>
                        <input type="text" name="name" class="form-control" required value="${data ? data.name : ''}">
                    </div>
                    <div class="form-group">
                        <label>Price ($)</label>
                        <input type="number" step="0.01" name="price" class="form-control" required value="${data ? data.price : ''}">
                    </div>
                `;
            } else if (type === 'part') {
                formFields.innerHTML = `
                    <div class="form-group">
                        <label>Part Name</label>
                        <input type="text" name="name" class="form-control" required value="${data ? data.name : ''}">
                    </div>
                    <div class="form-group">
                        <label>Price ($)</label>
                        <input type="number" step="0.01" name="price" class="form-control" required value="${data ? data.price : ''}">
                    </div>
                    <div class="form-group">
                        <label>Stock Count</label>
                        <input type="number" name="stock" class="form-control" required value="${data ? data.stock : ''}">
                    </div>
                    <div class="form-group">
                        <label>Image URL (Optional)</label>
                        <input type="text" name="img" class="form-control" placeholder="https://..." value="${data ? data.img : ''}">
                    </div>
                `;
            } else if (type === 'user') {
                formFields.innerHTML = `
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" name="name" class="form-control" required value="${data ? data.name : ''}">
                    </div>
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" class="form-control" required value="${data ? data.email : ''}">
                    </div>
                    <div class="form-group">
                        <label>Role</label>
                        <select name="role" class="form-control">
                            <option value="Customer" ${data && data.role === 'Customer' ? 'selected' : ''}>Customer</option>
                            <option value="Manager" ${data && data.role === 'Manager' ? 'selected' : ''}>Manager</option>
                            <option value="Admin" ${data && data.role === 'Admin' ? 'selected' : ''}>Admin</option>
                        </select>
                    </div>
                `;
            }

            modal.classList.add('open');
        }

        function closeModal() {
            document.getElementById('modal-overlay').classList.remove('open');
        }

        function handleFormSubmit(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const type = document.getElementById('item-type').value;
            const id = document.getElementById('edit-id').value;
            
            const name = formData.get('name');
            const price = parseFloat(formData.get('price'));

            if (type === 'service') {
                if (id) {
                    const s = services.find(x => x.id == id);
                    s.name = name; s.price = price;
                    showToast(`Service "${name}" updated.`);
                } else {
                    const newId = 100 + services.length + 1;
                    services.push({ id: newId, name: name, price: price });
                    showToast(`Service "${name}" added.`);
                }
            } else if (type === 'part') {
                const stock = parseInt(formData.get('stock'));
                let img = formData.get('img');
                if (!img) img = `https://picsum.photos/seed/${Math.random().toString(36).substring(7)}/50/50`;

                if (id) {
                    const p = parts.find(x => x.id == id);
                    p.name = name; p.price = price; p.stock = stock; p.img = img;
                    showToast(`Part "${name}" updated.`);
                } else {
                    const newId = 200 + parts.length + 1;
                    parts.push({ id: newId, name: name, price: price, stock: stock, img: img });
                    showToast(`Part "${name}" added.`);
                }
            } else if (type === 'user') {
                const email = formData.get('email');
                const role = formData.get('role');

                if (id) {
                    const u = users.find(x => x.id == id);
                    u.name = name; u.email = email; u.role = role;
                    showToast(`User "${name}" updated.`);
                } else {
                    const newId = 300 + users.length + 1;
                    users.push({ id: newId, name: name, email: email, role: role });
                    showToast(`User "${name}" created.`);
                }
            }

            closeModal();
            renderAll();
        }

        function deleteItem(type, id) {
            if(!confirm('Are you sure you want to delete this?')) return;
            
            if (type === 'service') services = services.filter(x => x.id !== id);
            else if (type === 'part') parts = parts.filter(x => x.id !== id);
            else if (type === 'user') users = users.filter(x => x.id !== id);
            
            renderAll();
            showToast('Item deleted.', 'danger');
        }

        // --- UTILS ---
        function showToast(message, color = 'success') {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.style.borderLeftColor = color === 'success' ? 'var(--success)' : 'var(--danger)';
            
            const icon = color === 'success' ? 'fa-check-circle' : 'fa-trash-alt';
            const iconColor = color === 'success' ? 'var(--success)' : 'var(--danger)';

            toast.innerHTML = `
                <i class="fas ${icon}" style="color: ${iconColor}; font-size: 1.2rem;"></i>
                <span>${message}</span>
            `;
            container.appendChild(toast);
            setTimeout(() => { toast.remove(); }, 3000);
        }

        function filterTable(tbodyId, text) {
            const filter = text.toLowerCase();
            const trs = document.getElementById(tbodyId).getElementsByTagName('tr');
            for (let i = 0; i < trs.length; i++) {
                let txtValue = trs[i].textContent || trs[i].innerText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    trs[i].style.display = "";
                } else {
                    trs[i].style.display = "none";
                }
            }
        }

        // Initialize
        renderAll();