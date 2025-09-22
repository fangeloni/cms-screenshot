// --- FUNZIONI ORIGINALI MODIFICATE ---
function aggiornaCampoGiochiFlaggati() {
    const checkboxes = document.querySelectorAll('#m_c_customTableForm_customTableForm_Thumbnails_list input[type="checkbox"]');
    const giochiFlaggati = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const checkboxId = checkbox.getAttribute('id');
            const label = document.querySelector(`label[for="${checkboxId}"]`);
            if (label) {
                giochiFlaggati.push(label.textContent.trim());
            }
        }
    });

    const originalThumbnailsField = document.getElementById('field_Thumbnails');
    if (originalThumbnailsField) {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');
        formGroup.id = 'formGroupThumbnailsFlaggate';
        formGroup.style.marginTop = '10px';

        const labelCell = document.createElement('div');
        labelCell.classList.add('editing-form-label-cell');
        const labelNuovoCampo = document.createElement('label');
        labelNuovoCampo.textContent = 'Thumbnails Flaggate:';
        labelNuovoCampo.classList.add('control-label', 'editing-form-label');
        labelCell.appendChild(labelNuovoCampo);
        formGroup.appendChild(labelCell);

        const valueCell = document.createElement('div');
        valueCell.classList.add('editing-form-value-cell');
        const flaggedItemsContainer = document.createElement('div');
        flaggedItemsContainer.style.marginTop = '6px';

        giochiFlaggati.forEach(gioco => {
            const fakeCheckbox = document.createElement('span');
            fakeCheckbox.style.display = 'inline-flex';
            fakeCheckbox.style.justifyContent = 'center';
            fakeCheckbox.style.alignItems = 'center';
            fakeCheckbox.style.width = '12px';
            fakeCheckbox.style.height = '12px';
            fakeCheckbox.style.border = '1px solid #888';
            fakeCheckbox.style.backgroundColor = '#eee';
            fakeCheckbox.style.marginRight = '5px';
            fakeCheckbox.style.verticalAlign = 'middle';

            const checkMark = document.createElement('span');
            checkMark.innerHTML = '&#10004;';
            checkMark.style.color = 'green';
            checkMark.style.fontSize = '10px';
            checkMark.style.fontWeight = 'bold';
            fakeCheckbox.appendChild(checkMark);

            const labelGioco = document.createElement('span');
            labelGioco.textContent = gioco;
            labelGioco.style.fontWeight = 'bold';
            labelGioco.style.marginRight = '10px';
            labelGioco.style.verticalAlign = 'middle';

            flaggedItemsContainer.appendChild(fakeCheckbox);
            flaggedItemsContainer.appendChild(labelGioco);
        });

        valueCell.appendChild(flaggedItemsContainer);
        formGroup.appendChild(valueCell);

        originalThumbnailsField.parentNode.insertBefore(formGroup, originalThumbnailsField.nextSibling);
        originalThumbnailsField.style.display = 'none';
    }
}

function aggiornaCampoCategorieFlaggate() {
    const checkboxes = document.querySelectorAll('#m_c_customTableForm_customTableForm_Categories_list input[type="checkbox"]');
    const categorieFlaggate = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const checkboxId = checkbox.getAttribute('id');
            const label = document.querySelector(`label[for="${checkboxId}"]`);
            if (label) {
                categorieFlaggate.push(label.textContent.trim());
            }
        }
    });

    const originalCategoriesField = document.getElementById('field_Categories');
    if (originalCategoriesField) {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');
        formGroup.id = 'formGroupCategorieFlaggate';
        formGroup.style.marginTop = '10px';
        formGroup.style.display = 'none';

        const labelCell = document.createElement('div');
        labelCell.classList.add('editing-form-label-cell');
        const labelNuovoCampo = document.createElement('label');
        labelNuovoCampo.textContent = 'Categorie Flagate:';
        labelNuovoCampo.classList.add('control-label', 'editing-form-label');
        labelCell.appendChild(labelNuovoCampo);
        formGroup.appendChild(labelCell);

        const valueCell = document.createElement('div');
        valueCell.classList.add('editing-form-value-cell');
        const flaggedItemsContainer = document.createElement('div');
        flaggedItemsContainer.style.marginTop = '6px';

        categorieFlaggate.forEach(categoria => {
            const fakeCheckbox = document.createElement('span');
            fakeCheckbox.style.display = 'inline-flex';
            fakeCheckbox.style.justifyContent = 'center';
            fakeCheckbox.style.alignItems = 'center';
            fakeCheckbox.style.width = '12px';
            fakeCheckbox.style.height = '12px';
            fakeCheckbox.style.border = '1px solid #888';
            fakeCheckbox.style.backgroundColor = '#eee';
            fakeCheckbox.style.marginRight = '5px';
            fakeCheckbox.style.verticalAlign = 'middle';

            const checkMark = document.createElement('span');
            checkMark.innerHTML = '&#10004;';
            checkMark.style.color = 'green';
            checkMark.style.fontSize = '10px';
            checkMark.style.fontWeight = 'bold';
            fakeCheckbox.appendChild(checkMark);

            const labelCategoria = document.createElement('span');
            labelCategoria.textContent = categoria;
            labelCategoria.style.fontWeight = 'bold';
            labelCategoria.style.marginRight = '10px';
            labelCategoria.style.verticalAlign = 'middle';

            flaggedItemsContainer.appendChild(fakeCheckbox);
            flaggedItemsContainer.appendChild(labelCategoria);
        });

        valueCell.appendChild(flaggedItemsContainer);
        formGroup.appendChild(valueCell);

        originalCategoriesField.parentNode.insertBefore(formGroup, originalCategoriesField.nextSibling);
        originalCategoriesField.style.display = 'none';
    }
}

function createPreviewForClient() {
    const forcedHideFields = [
        'field_Channel', 'field_Label', 'field_PageTitle', 'field_GameInside',
        'field_IsRegistrationPromo', 'field_UrlImageOverview', 'field_UrlImageOverviewHome',
        'field_UrlImageDetail', 'field_Timer', 'field_PageDescription',
        'field_DestinationUrl1', 'field_DestinationUrl2', 'field_Order'
    ];

    forcedHideFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            const formGroup = field.closest('.form-group');
            if (formGroup && !formGroup.id.startsWith('formGroup')) {
                formGroup.style.display = 'none';
            }
        }
    });

    const createImagePreview = (fieldId, labelText) => {
        const field = document.getElementById(fieldId);
        if (field) {
            const inputElement = field.querySelector('input[type="text"]');
            const imageUrl = inputElement ? inputElement.value.trim() : '';
            const formGroup = field.closest('.form-group');

            if (imageUrl && formGroup) {
                const previewContainer = document.createElement('div');
                previewContainer.classList.add('form-group');
                previewContainer.id = `preview_${fieldId}`;
                previewContainer.style.marginTop = '10px';

                const labelCell = document.createElement('div');
                labelCell.classList.add('editing-form-label-cell');
                const labelNuovoCampo = document.createElement('label');
                labelNuovoCampo.textContent = labelText + ':';
                labelNuovoCampo.classList.add('control-label', 'editing-form-label');
                labelCell.appendChild(labelNuovoCampo);
                previewContainer.appendChild(labelCell);

                const valueCell = document.createElement('div');
                valueCell.classList.add('editing-form-value-cell');
                const imageElement = document.createElement('img');
                imageElement.src = imageUrl;
                imageElement.style.display = 'block';
                imageElement.style.maxHeight = '200px';
                imageElement.style.height = 'auto';
                valueCell.appendChild(imageElement);
                previewContainer.appendChild(valueCell);

                formGroup.parentNode.insertBefore(previewContainer, formGroup.nextSibling);
                formGroup.style.display = 'none';
            }
        }
    };

    createImagePreview('field_UrlImageOverview', 'Anteprima Immagine Overview');
    createImagePreview('field_UrlImageOverviewHome', 'Anteprima Immagine Home');
    createImagePreview('field_UrlImageDetail', 'Anteprima Immagine Dettaglio');

    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        if (group.id.startsWith('formGroup') || group.id.startsWith('preview_')) {
            return;
        }

        const input = group.querySelector('input[type="text"], textarea');
        const select = group.querySelector('select');
        const radios = group.querySelectorAll('input[type="radio"]');
        const checkboxes = group.querySelectorAll('input[type="checkbox"]');

        let shouldShow = false;

        if (input && input.value.trim() !== '') {
            shouldShow = true;
        }

        if (select && select.value !== '') {
            shouldShow = true;
        }

        if (radios.length > 0) {
            radios.forEach(radio => {
                if (radio.checked) shouldShow = true;
            });
        }

        if (checkboxes.length > 0) {
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) shouldShow = true;
            });
        }

        if (!shouldShow) {
            group.style.display = 'none';
        }
    });
}

function adjustSpecificInputWidths() {
    const descriptionOverviewInput = document.getElementById('m_c_customTableForm_customTableForm_DescriptionOverview_txtText');
    const linkButton1Input = document.getElementById('m_c_customTableForm_customTableForm_LinkButton1_txtText');
    const linkButton2Input = document.getElementById('m_c_customTableForm_customTableForm_LinkButton2_txtText');

    const adjustWidth = (input) => {
        if (input) {
            const minWidth = 320;
            const padding = 20;

            const tempSpan = document.createElement('span');
            tempSpan.style.visibility = 'hidden';
            tempSpan.style.whiteSpace = 'pre';
            tempSpan.style.font = window.getComputedStyle(input).font;
            tempSpan.textContent = input.value || input.placeholder || '';
            document.body.appendChild(tempSpan);

            const width = Math.max(tempSpan.offsetWidth + padding, minWidth);
            input.style.width = width + 'px';
            input.style.maxWidth = 'none';

            document.body.removeChild(tempSpan);

            input.addEventListener('input', () => {
                tempSpan.textContent = input.value || input.placeholder || '';
                const newWidth = Math.max(tempSpan.offsetWidth + padding, minWidth);
                input.style.width = newWidth + 'px';
                input.style.maxWidth = 'none';
            });
        }
    };

    adjustWidth(descriptionOverviewInput);
    adjustWidth(linkButton1Input);
    adjustWidth(linkButton2Input);
}

function waitForExternalImages() {
    return new Promise((resolve) => {
        const images = document.querySelectorAll('#preview_field_UrlImageOverview img, #preview_field_UrlImageOverviewHome img, #preview_field_UrlImageDetail img');
        const numImages = images.length;
        let imagesLoaded = 0;

        if (numImages === 0) {
            resolve();
            return;
        }

        images.forEach(img => {
            img.onload = () => {
                imagesLoaded++;
                if (imagesLoaded === numImages) {
                    resolve();
                }
            };

            img.onerror = () => {
                console.error('Errore nel caricamento dell\'immagine:', img.src);
                imagesLoaded++;
                if (imagesLoaded === numImages) {
                    resolve();
                }
            };

            if (img.complete) {
                imagesLoaded++;
                if (imagesLoaded === numImages) {
                    resolve();
                }
            }
        });
    });
}

function resizeEditors() {
    const editorElements = document.querySelectorAll('[id^="cke_m_c_customTableForm_customTableForm_TextAccordion"], #cke_m_c_customTableForm_customTableForm_DescriptionDetail_editor');

    editorElements.forEach(editorElement => {
        const contentsElement = editorElement?.querySelector('.cke_contents.cke_reset');
        const iframeElement = contentsElement?.querySelector('.cke_wysiwyg_frame.cke_reset');

        if (editorElement && contentsElement && iframeElement) {
            try {
                const iframeDocument = iframeElement.contentDocument || iframeElement.contentWindow?.document;
                const iframeBody = iframeDocument?.body;

                if (iframeBody) {
                    const resizeObserver = new ResizeObserver(() => {
                        const contentHeight = iframeBody.scrollHeight;
                        const extraPadding = 50;
                        const containerExtraHeight = 132;
                        const finalContentHeight = contentHeight + extraPadding;
                        const finalContainerHeight = finalContentHeight + containerExtraHeight;

                        iframeElement.style.height = `${finalContentHeight}px`;
                        contentsElement.style.height = `${finalContentHeight}px`;
                        editorElement.style.height = `${finalContainerHeight}px`;
                        contentsElement.style.overflow = 'hidden';
                    });

                    resizeObserver.observe(iframeBody);
                }
            } catch (error) {
                console.error('Errore nel ridimensionamento dinamico:', error);
            }
        }
    });
}

async function prepareForScreenshot() {
    aggiornaCampoGiochiFlaggati();
    aggiornaCampoCategorieFlaggate();
    createPreviewForClient();
    adjustSpecificInputWidths();
    console.log('Attendo il caricamento delle anteprime delle immagini...');
    await waitForExternalImages();
    console.log('Tutte le anteprime delle immagini sono state caricate. Ora puoi fare lo screenshot.');
    setTimeout(resizeEditors, 500);
}

// Esegui la funzione principale
//prepareForScreenshot();
