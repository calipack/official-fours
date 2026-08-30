function initialOf(name){
  return (name || "?").trim().charAt(0).toUpperCase();
}

function renderTier(tierKey, gridId, countId, roleLabel){
  const grid = document.getElementById(gridId);
  const countEl = document.getElementById(countId);
  const list = (window.FOURS_MEMBERS && window.FOURS_MEMBERS[tierKey]) || [];

  countEl.textContent = String(list.length).padStart(2, '0');

  grid.innerHTML = list.map(member => {
    const safeName = (member.name || "Unnamed").replace(/</g, "&lt;");
    const avatarHtml = member.avatar
      ? `<img class="member-avatar member-avatar-img" src="${member.avatar}" alt="${safeName} avatar" referrerpolicy="no-referrer" loading="lazy" onerror="this.outerHTML='<div class=&quot;member-avatar&quot;>${initialOf(member.name)}</div>'">`
      : `<div class="member-avatar">${initialOf(member.name)}</div>`;

    return `
      <div class="member-card">
        ${avatarHtml}
        <div class="member-name">${safeName}</div>
        <div class="member-role">${roleLabel}</div>
      </div>`;
  }).join('');
}

renderTier('god', 'grid-god', 'count-god', 'God');
renderTier('fathers', 'grid-fathers', 'count-fathers', 'Father');
renderTier('family', 'grid-family', 'count-family', 'Family');
