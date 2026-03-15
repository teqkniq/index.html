/* skills-inject.js — idempotent DOM-ready fallback for the skills grid.
 * If renderSkills() has already built a .skills-grid inside #skills-container
 * this script does nothing except ensure Skill 1 has a .skill-label.
 * When skills are injected by another mechanism (or when the static placeholder
 * is still present) it wraps the first 6 .skill-btn/.skill-btn-thin nodes in a
 * .skills-grid container and adds the required .skill / .skill-N classes.
 */
(function () {
    'use strict';

    function ensureSkillLabel(skill1) {
        if (!skill1) return;
        if (!skill1.classList.contains('skill-slot')) skill1.classList.add('skill-slot');
        if (!skill1.querySelector('.skill-label')) {
            var label = document.createElement('span');
            label.className = 'skill-label';
            // Prefer the first child span's text; fall back to first line of button text
            var firstSpan = skill1.querySelector('span:not(.skill-label)');
            label.textContent = firstSpan
                ? firstSpan.textContent.trim()
                : (skill1.textContent.trim().split('\n')[0].trim() || 'Skill 1');
            skill1.insertBefore(label, skill1.firstChild);
        }
    }

    function injectSkillsGrid() {
        var container = document.getElementById('skills-container');
        if (!container) return;

        // If a .skills-grid already exists (built by renderSkills) just ensure label
        var existingGrid = container.querySelector('.skills-grid');
        if (existingGrid) {
            ensureSkillLabel(existingGrid.querySelector('.skill-1'));
            return;
        }

        // Gather loose skill buttons that haven't been wrapped yet
        var nodes = Array.from(
            container.querySelectorAll('.skill-btn, .skill-btn-thin')
        ).filter(function (n) { return !n.closest('.skills-grid'); });

        if (nodes.length === 0) return;

        var grid = document.createElement('div');
        grid.className = 'skills-grid';

        nodes.slice(0, 6).forEach(function (node, i) {
            var n = i + 1;
            if (!node.classList.contains('skill')) node.classList.add('skill');
            if (!node.classList.contains('skill-' + n)) node.classList.add('skill-' + n);
            grid.appendChild(node);
        });

        container.insertBefore(grid, container.firstChild);
        ensureSkillLabel(grid.querySelector('.skill-1'));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectSkillsGrid);
    } else {
        injectSkillsGrid();
    }
}());
