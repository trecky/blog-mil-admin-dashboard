import {FuseLoadable} from '@fuse';

export const ProjectDashboardAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/dashboards/project',
            component: FuseLoadable({
                loader: () => import('./ProjectDashboardApp')
            })
        }
    ]
};
